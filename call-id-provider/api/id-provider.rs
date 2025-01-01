// NOTE: When deploying to Vercel you must select node version 18 otherwise you will
// see an error, this is not an issue on our end, rather it is on Vercel's end.
// See (https://vercel.com/guides/serverless-function-contains-invalid-runtime-error)

use vercel_runtime::{run, Body, Error, Request, Response};
use id_provider_lib::{Build_Response, Check_Id_Exists, Create_Pool, Extract_Call_Id, Init_DB,
    SUCCESS, FAIL, MAX_ID, MAX_ITERS, MIN_ID};
use sqlx::{PgPool, Row};
use rand::Rng;
use http::Method;

// Entry point
#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
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
async fn Get_Call_Id(pool: &PgPool, first_run: bool) -> Result<i32, sqlx::Error> {
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

// Function to remove id from DB once a call has ended
async fn Remove_Call_Id(pool: &PgPool, id: i32) -> Result<(), sqlx::Error> {
    sqlx::query("DELETE FROM ongoing_calls WHERE id=($1);")
        .bind(id)
        .execute(pool)
        .await?;

    Ok(())
}

// Handling GET and POST requests
pub async fn handler(req: Request) -> Result<Response<Body>, Error> {
    let pool:   PgPool = Create_Pool().await;
    let result: String;

    if *req.method() == Method::GET {
        result = Get_Call_Id(&pool, false).await?.to_string();
    }

    else if *req.method() == Method::POST {
        Remove_Call_Id( &pool, Extract_Call_Id(req.body()) ).await?;

        result = "Successfully removed call id!".to_string();
    }

    else {
        result = "Method not allowed!".to_string();
        let response = Build_Response(result, FAIL);

        return Ok(response);
    }

    let response = Build_Response(result, SUCCESS);
    Ok(response)
}
