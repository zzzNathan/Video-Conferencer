// Returns the first call id not in use, then
// adds this call id to the database to mark it
// as being used

import StatusCodes from 'http-status-codes'

const TABLE_NAME = "ongoing_calls"
const MIN_ID = 1
const MAX_ID = 999_999
const TOTAL_NUM_IDS = 1_000_000

// Function to count the number call ids in use
// If the id arguement is passed in then function will
// count the number of call ids equal to the arguement
async function Count_Elements(env, id = null)
{
  var query = `SELECT COUNT(id) FROM ${TABLE_NAME}`

  // If id arguement is passed return the number of ids
  if (id !== null) query += ` WHERE id = ${id}`

  const result = await env.DB.prepare(query).run()

  // Get count from JSON format
  const count = result.results[0]["COUNT(id)"]

  return count
}

// Function to get the number of records in the table,
// that is to get the number of calls currently in progress
async function Get_Number_Of_Calls(env)
{
  try { return Count_Elements(env) }

  catch (error)
  {
    return new Response(`Error: ${error.message}`,
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
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
    if (Count_Elements(env, rand) == 0) Is_Taken = false
  }

  return rand
}

// Generates a call id in linear time
async function Generate_Linear(env)
{
  // If element is not taken then we can return it
  for (let id = 1; id <= MAX_ID; id++)
    if (Count_Elements(env, id) == 0) return id
}

// Function to generate a unique call id
async function Generate_Call_Id(env)
{
  var unique_id = 0

  if (Count_Elements(env) / TOTAL_NUM_IDS <= 0.25)
    unique_id = Generate_PRNG(env)

  else unique_id = Generate_Linear(env)

  // Once the unique call id has been generated
  // we must add it to the database to mark that it is in use
  const query  = `INSERT INTO ${TABLE_NAME} VALUES (${unique_id})`
  const result = await env.DB.prepare(query).run()

  return new Response(unique_id, { status: StatusCodes.OK })
}

// Function to remove a unique call id from the
// database once a call has finished
async function Remove_Call_Id(request, env)
{
  try
  {
    const query = `DELETE FROM ${TABLE_NAME} WHERE id = ${request.User_Id}`
    const result = await env.DB.prepare(query).run()

    return new Response("Successfully deleted call-id!",
      { status: StatusCodes.OK }
    )
  }

  catch (error)
  {
    return new Response(`Error: ${error.message}`,
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
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
