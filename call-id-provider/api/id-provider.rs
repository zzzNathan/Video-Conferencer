use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};
use sqlx::{Connection, PgConnection};
use dotenv::dotenv;

const SCHEMA: &str = "CREATE TABLE IF NOT EXISTS ongoing_calls(id INTEGER NOT NULL);";

// Entry point
#[tokio::main]
async fn main() -> Result<(), Error> {
    dotenv().ok();
    run(handler).await
}

async fn Get_Call_Id() -> Result<String, sqlx::Error> {
    let connection_str = std::env::var("DB_CONNECTION").expect("Couldn't get DB connection string!");
    let mut connection = PgConnection::connect(&connection_str).await?;

    sqlx::query(&*SCHEMA)
        .execute(&mut connection)
        .await?;

    // Insert a new id into the table
    let call_id = 123; // Just as an example; in practice you might want to generate this uniquely
    let dbg = sqlx::query("INSERT INTO ongoing_calls (id) VALUES ($1)")
        .bind(call_id)
        .execute(&mut connection)
        .await?;

    println!("result: {:?}", dbg);

    Ok(call_id.to_string())
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    match Get_Call_Id().await {
        Ok(id) => {
            println!("Received Call ID: {}", id);
        },
        Err(e) => {
            eprintln!("Error getting call ID: {}", e);
            return Ok(Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .body(Body::from("{\"message\":\"Internal Server Error\"}"))?);
        }
    }

    let message = "{\"message\":\"Hello world!\"}";

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(Body::from(message))?
    )
}
