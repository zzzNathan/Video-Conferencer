import axios from "axios"
import { useSearchParams } from "react-router"

const Get_Token_API   = "https://stream-token-provider.vconf.workers.dev/"
const Get_Call_Id_API = "https://call-id-provider-6mblscpih-jonathans-projects-4e9ca91e.vercel.app/api/id-provider"

// Function to retrieve the call id code from our url
export function Get_Call_Id_From_URL()
{
  const [Search_Params, Set_Search_Params] = useSearchParams()
  const code = Search_Params.get("code")

  return Number(code)
}

// Function to check whether or not a call is actually ongoing with a specific code
export async function Check_Ongoing(code)
{
  return axios
    .post(Get_Call_Id_API, { "Call_Id": code })
    .then((response) => {
      return response.data == "YES" ? true : false
    })
    .catch((error) => {
      throw new Error(error.message)
    })
}

// Function to retrieve the user's unique GetStream token
export async function Get_Stream_Token(User_Id)
{
  // If User_Id is not yet loaded don't do anything
  if (!User_Id) return

  return axios
    .post(Get_Token_API, { "User_Id": User_Id })
    .then((response) => {
      return response.data.token
    })
    .catch((error) => {
      throw new Error(error.message)
    })
}

// Function to retrieve a unique call id upon
// creation of a video call
export async function Get_Call_Id()
{
  return axios
    .get(Get_Call_Id_API)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw new Error(error.message)
    })
}

// Function to remove the call id from our DB of ongoing
// calls once a call has ended
export async function End_Call(code)
{
  return axios
    .delete(Get_Call_Id_API, { "Call_Id": code })
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error(error.message)
    })
}
