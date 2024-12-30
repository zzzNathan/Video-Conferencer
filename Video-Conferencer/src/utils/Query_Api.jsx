import axios from "axios"

const Get_Token_API   = "https://stream-token-provider.vconf.workers.dev/"
const Get_Call_ID_API = "https://call-id-generator.vconf.workers.dev/"

export async function Check_Ongoing(code) {}

// Function to retrieve the user's unique GetStream token
export async function Get_Stream_Token(User_Id)
{
  // If User_Id is not yet loaded don't do anything
  if (!User_Id) return

  axios
    .post(Get_Token_API, { User_Id: User_Id })
    .then((response) => {
      return response.data.token
    })
    .catch((error) => {
      throw new Error(error.message);
    })
}

// Function to retrieve a unique call id upon
// creation of a video call
export async function Get_Call_Id()
{
  axios
    .get(Get_Call_ID_API)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error(error.message)
    })
}

// Function to remove the call id from our DB of ongoing
// calls once a call has ended
export async function End_Call(code)
{
  axios
    .post(Get_Call_ID_API, { Call_Id: code })
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error(error.message)
    })
}
