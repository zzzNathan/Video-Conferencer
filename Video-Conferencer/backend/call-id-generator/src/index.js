const { Pool } = require('pg')
const fs = require('fs')

const connectionString = env.DB_CONNECTION

const RESPONSE_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
}

const pool = new Pool({
  connectionString: connectionString,
    ssl: {
      ca: fs.readFileSync('/path/to/ca.crt').toString(),
    },
})

// Function to generate a unique call id
async function Generate_Id()
{
  const client = await pool.connect()
  const schema = "CREATE TABLE IF NOT EXISTS Call-ids (id INTEGER NOT NULL)"

  try {
    // Initialise table
    const result = await client.query("SELECT 1")
    console.log(result)
  } finally {
    client.release()
  }
}
Generate_Id()
/*
export default
{
  async fetch(request, env)
  {
    return Generate_Id(request, env)
  }
}*/
