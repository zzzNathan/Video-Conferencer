use vercel_runtime::{Body, Response, StatusCode};
use sqlx::{PgPool, Row};
use dotenv::dotenv;
use serde::Deserialize;

// The format of the POST requests
#[derive(Deserialize)]
struct Call_Id_Request {
    Call_Id: i32
}

const SCHEMA: &str = "CREATE TABLE IF NOT EXISTS ongoing_calls(id INTEGER NOT NULL);";
pub const MIN_ID:    i32 = 1;
pub const MAX_ID:    i32 = 999_999;
pub const MAX_ITERS: i32 = 1_000_000;
pub const SUCCESS:  bool = false; // Used as the error arg in Build_Response()
pub const FAIL:     bool = true;  // ^^

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
pub async fn Init_DB(pool: &PgPool) -> Result<(), sqlx::Error> {
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

// Function to return response in the HTTP endpoint
pub fn Build_Response(message: String, error: bool) -> Response<Body> {
    // If another method is given other than GET or POST we return an error
    let status: StatusCode = if error { StatusCode::OK } else { StatusCode::METHOD_NOT_ALLOWED };

    return Response::builder()
        .status(status)
        .header("Content-Type", "application/json")
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
