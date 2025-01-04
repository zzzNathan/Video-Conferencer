// NOTE: When deploying to Vercel you must select node version 18 otherwise you will
// see an error, this is not an issue on our end, rather it is on Vercel's end.
// See (https://vercel.com/guides/serverless-function-contains-invalid-runtime-error)

use vercel_runtime::{run, Body, Error, Request, Response};
use sqlx::PgPool;
use http::Method;
use id_provider_lib::{
    Build_Response, Check_Id_Exists, Create_Pool, Extract_Call_Id, Get_Call_Id, Handle_Preflight, Remove_Call_Id, FAIL, SUCCESS
};

// Entry point
#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

// Handling GET, DELETE and POST requests
pub async fn handler(req: Request) -> Result<Response<Body>, Error> {
    let pool:   PgPool = Create_Pool().await;
    let result: String;

    // Get unique call id
    if *req.method() == Method::GET {
        let id: i32 = Get_Call_Id(&pool, false).await?;

        result = format!("{}", id);
    }

    // Handle preflight requests for POST
    else if *req.method() == Method::OPTIONS {
        return Ok( Handle_Preflight() );
    }

    // Remove given call id
    else if *req.method() == Method::DELETE {
        let id: i32 = Extract_Call_Id(req.body());
        Remove_Call_Id(&pool, id).await?;

        result = "Successfully removed call id!".to_string();
    }

    // Check if given call id exists in our DB
    else if *req.method() == Method::POST {
        let id:     i32  = Extract_Call_Id(req.body());
        let exists: bool = Check_Id_Exists(&pool, id).await?;

        result = if exists { "YES".to_string() } else { "NO".to_string() };
    }

    else {
        result = "Method not allowed!".to_string();

        return Ok( Build_Response(result, FAIL) );
    }

    Ok( Build_Response(result, SUCCESS) )
}
