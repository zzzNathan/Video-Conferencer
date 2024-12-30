// Provides users with their unique GetStream user
// tokens

import StatusCodes from "http-status-codes"
import { StreamClient } from "@stream-io/node-sdk"

const MAX_USER_ID_LENGTH = 512
const RESPONSE_HEADERS   = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
}

// Validate the user id given is correct
function Validate_User_Id(User_Id)
{
  if (User_Id.length > MAX_USER_ID_LENGTH ||
      User_Id.length == 0)
    return false

  return true
}

// Code to generate unique user GetStream token
async function Generate_Token(User_Id, Api_Key, Secret)
{
  const client = new StreamClient(Api_Key, Secret)

  // Create user
  const newUser = { id: User_Id, role: "user" }
  await client.upsertUsers([newUser])

  // Generate token
  const token = client.generateUserToken({ user_id: User_Id })

  return token
}

// An HTTP endpoint that allows POST requests
// with a user id given in the request. Will return
// a unique user token that can be used to begin
// video conferencing
async function Provide_Token(request, env)
{
  const apiKey = env.STREAM_API_KEY
  const secret = env.STREAM_API_SECRET

  // Ignore preflight requests
  if (request.method === "OPTIONS")
    return new Response(null, { headers: RESPONSE_HEADERS })

  // Ensure that the request is a POST
  if (request.method !== "POST")
    return new Response("Method not allowed",
      {
      	status:  StatusCodes.METHOD_NOT_ALLOWED,
       	headers: RESPONSE_HEADERS
      }
    )

  try
  {
    const { User_Id } = await request.json()

    // Ensure that a valid user id is actually provided
    if (!Validate_User_Id(User_Id))
      return new Response("Bad Request: Proper userId is required",
        {
        	status:  StatusCodes.BAD_REQUEST,
          headers: RESPONSE_HEADERS
        }
      )

    // Generate and send token
    const token = await Generate_Token(User_Id, apiKey, secret)

    return new Response(JSON.stringify({ token }), {
      headers: RESPONSE_HEADERS,
    })

  }

  catch (error)
  {
    return new Response(`Error: ${error.message}`,
      {
      	status: StatusCodes.INTERNAL_SERVER_ERROR,
        headers: RESPONSE_HEADERS
      }
    )
  }
}

export default
{
  async fetch(request, env)
  {
    return Provide_Token(request, env)
  }
}
