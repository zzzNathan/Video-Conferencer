import axios from "axios"

const Get_Token_API   = "https://stream-token-provider.jotkasongo.workers.dev/"
const Get_Call_ID_API = "https://call-id-generator.jotkasongo.workers.dev/"

export async function Get_Stream_Token(User_Id)
{
  // If User_Id is not yet loaded don't do anything
  if (!User_Id) return
   
  // Fetch the token from our API
  const uuid = {"User_Id": User_Id}

  axios.post(Get_Token_API, uuid)
    .then(response => {return response.data.token})
    .catch(error   => {throw new Error(error.message)})
}

export async function Get_Call_Id()
{
  // Get the call id from our API
  axios.get(Get_Call_ID_API)
    .then(response  => {return response})
    .catch(error    => {throw new Error(error.message)})
}

export async function End_Call(code)
{
  const data = { "Call_Id": code }

  // Remove the call id from currently 
  // ongoing calls
  axios.post(Get_Call_ID_API, data)
    .then(response  => {return response})
    .catch(error    => {throw new Error(error.message)})
}
