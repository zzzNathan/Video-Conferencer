// Returns the first call id not in use, then
// adds this call id to the database to mark it
// as being used

import StatusCodes from 'http-status-codes'

const RESPONSE_HEADERS   = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
}
const HTTP_HEADERS = new Headers(RESPONSE_HEADERS)

const TABLE_NAME = "ongoing_calls"
const MIN_ID = 1
const MAX_ID = 999_999
const TOTAL_NUM_IDS = 1_000_000

// Function to count the number call ids in use
// If the id arguement is passed in then function will
// count the number of call ids equal to the arguement
async function Count_Elements(env, id = null)
{
  var query  = `SELECT COUNT(id) FROM ${TABLE_NAME}`
  var result = ""

  // If id arguement is passed return the number of ids
  if (id !== null)
  {
    query += ` WHERE id = ?`
    result = await env.DB.prepare(query).bind(id).run()
  }

  else result = await env.DB.prepare(query).run()

  // Get count from JSON format
  const count = result.results[0]["COUNT(id)"]

  return count
}

// Generates a call id using a PRNG
async function Generate_PRNG(env)
{
  var Is_Taken = true

  while (Is_Taken)
  {
    // Since JS returns random numbers in the interval [0, 1)
    var rand = Math.floor(Math.random() * (MAX_ID - MIN_ID + 1)) + MIN_ID

    // If id is unused stop iterating
    if (await Count_Elements(env,rand) == 0) Is_Taken = false
  }

  return rand
}

// Generates a call id in linear time
async function Generate_Linear(env)
{
  // If element is not taken then we can return it
  for (let id = 1; id <= MAX_ID; id++)
    if (await Count_Elements(env, id) == 0) return id
}

// Function to generate a unique call id
async function Generate_Call_Id(env)
{
  var unique_id = 0

  if (await Count_Elements(env) / TOTAL_NUM_IDS <= 0.25)
    unique_id = await Generate_PRNG(env)

  else unique_id = await Generate_Linear(env)

  // Once the unique call id has been generated
  // we must add it to the database to mark that it is in use
  const query  = `INSERT INTO ${TABLE_NAME} VALUES (?)`
  const result = await env.DB.prepare(query).bind(unique_id).run()

  return new Response(unique_id,
    {
      status: StatusCodes.OK,
      headers: HTTP_HEADERS
    }
  )
}

// Function to remove a unique call id from the
// database once a call has finished
async function Remove_Call_Id(request, env)
{
  const body   = await request.json()
  const query  = `DELETE FROM ${TABLE_NAME} WHERE id = ?`
  const result = await env.DB.prepare(query).bind(body.Call_Id).run()

  return new Response("Successfully deleted call-id!",
    {
      status: StatusCodes.OK,
      headers: HTTP_HEADERS
    }
  )
}

export default
{
  async fetch(request, env, ctx)
  {
    if (request.method === "GET")
      return Generate_Call_Id(env)

    if (request.method === "POST")
      return Remove_Call_Id(request, env)
  }
}
