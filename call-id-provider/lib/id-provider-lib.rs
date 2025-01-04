use vercel_runtime::{Body, Response, StatusCode, Error};
use sqlx::{PgPool, Row};
use dotenv::dotenv;
use serde::Deserialize;
use rand::Rng;

const SCHEMA: &str = "CREATE TABLE IF NOT EXISTS ongoing_calls(id INTEGER NOT NULL);";
const MIN_ID:      i32 = 1;
const MAX_ID:      i32 = 999_999;
const MAX_ITERS:   i32 = 1_000_000;
pub const SUCCESS: bool = false; // Used as the error arg in Build_Response()
pub const FAIL:    bool = true;  // ^^

// The format of the POST requests
#[derive(Deserialize)]
struct Call_Id_Request {
    Call_Id: i32
}

// DB helper functions
// --------------------

// Returns a pool of connections to our DB
pub async fn Create_Pool() -> PgPool {
    dotenv().ok(); // Load environment variables

    let conn_URI: String = std::env::var("DB_CONNECTION")
        .expect("Couldn't get connection URI!");

    let pool: PgPool = PgPool::connect_lazy(&conn_URI)
        .expect("Couldn't connect to DB!");

    return pool;
}

// Function to initialise DB if it hasn't been already
async fn Init_DB(pool: &PgPool) -> Result<(), sqlx::Error> {
    sqlx::query(&*SCHEMA)
        .execute(pool)
        .await?;

    Ok(())
}

// Function to check if a given call id exists in our DB
pub async fn Check_Id_Exists(pool: &PgPool, id: i32) -> Result<bool, sqlx::Error> {
    // Get the number of rows affected, if this is 0 then the id clearly
    // doesn't exist in our DB
    let count: i64 = sqlx::query("SELECT COUNT(id) FROM ongoing_calls WHERE id = ($1);")
        .bind(id)
        .fetch_one(pool)
        .await?
        .get(0);

    if count == 0 {Ok(false)}
    else          {Ok(true)}
}

// Function to remove id from DB once a call has ended
pub async fn Remove_Call_Id(pool: &PgPool, id: i32) -> Result<(), sqlx::Error> {
    sqlx::query("DELETE FROM ongoing_calls WHERE id=($1);")
        .bind(id)
        .execute(pool)
        .await?;

    Ok(())
}

// Function to find the first available call id using a linear
// implemenation. Returns -1 if we took too long to find a call id.
async fn Generate_PRNG(pool: &PgPool) -> i32 {
    let taken:     bool = true;
    let mut iters: i32  = 0;

    // Keep iterating until we find an available id
    while taken && iters <= MAX_ITERS {
        let ran: i32 = rand::thread_rng().gen_range(MIN_ID..=MAX_ID);

        let exists: bool = Check_Id_Exists(pool, ran)
            .await
            .expect("Check_Id() exists function failed!");

        if !exists {return ran;}

        iters += 1;
    }

    return -1;
}

// Function to find the first available call id using a linear
// implemenation. Returns -1 if all call ids are taken.
async fn Generate_Linear(pool: &PgPool) -> i32 {
    let mut id: i32 = -1;

    // Iterate over all ids until we find one that is available
    for i in MIN_ID..=MAX_ID {
        let taken: bool = Check_Id_Exists(pool, i)
            .await
            .expect("Check_Id() exists function failed!");

        if !taken {
            id = i;
            break;
        }
    }
    return id;
}

// Generates a unique call id to be used and adds it to our DB
pub async fn Get_Call_Id(pool: &PgPool, first_run: bool) -> Result<i32, sqlx::Error> {
    // If it's the first time running we should initialise our DB
    if first_run {
        Init_DB(pool).await?;
    }

    let total: i64 = sqlx::query("SELECT COUNT(id) FROM ongoing_calls;")
        .fetch_one(pool)
        .await?
        .get(0);

    let id: i32;
    if (total as f64) / (MAX_ID as f64) <= 0.25 {
        id = Generate_PRNG(pool).await;
    } else {
        id = Generate_Linear(pool).await;
    }

    // If we find an available id we should add it to the DB as it will be used now
    if id == -1 {
        return Ok(id);
    }

    sqlx::query("INSERT INTO ongoing_calls VALUES ($1);")
        .bind(id)
        .execute(pool)
        .await?;

    Ok(id)
}

// HTTP helper functions
// ----------------------

// Function to return response in the HTTP endpoint
pub fn Build_Response(message: String, error: bool) -> Response<Body> {
    // If another method is given other than GET, DELETE or POST we return an error
    let status: StatusCode = if error { StatusCode::OK } else { StatusCode::METHOD_NOT_ALLOWED };

    return Response::builder()
        .status(status)
        .header("Content-Type", "application/json")
        .header("Access-Control-Allow-Origin", "*")
        .body(Body::from(message))
        .expect("Couldn't build response!");
}

// Function to extract the "Call_Id" field from the HTTP request
pub fn Extract_Call_Id(request_body: &Body) -> i32 {
    // Read body and convert it into a string
    let request_string: String = String::from_utf8(request_body.to_vec())
        .expect("Failed to convert request body to string!");

    // Turn string into JSON
    let request_json: Call_Id_Request = serde_json::from_str(&request_string)
        .expect("Couldn't deserialise JSON!");

    return request_json.Call_Id;
}

// Function to handle OPTIONS preflight requests
pub fn Handle_Preflight() -> Response<Body> {
    return Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .header("Access-Control-Allow-Origin", "*")
        .body(Body::from(""))
        .expect("Couldn't build response");
}
