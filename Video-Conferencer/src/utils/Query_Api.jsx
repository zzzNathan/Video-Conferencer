import axios from "axios"

const Get_Room_Code_API = "https://call-id-provider.vercel.app/api/provider"

// Function to get a room code from our API
export async function Get_Room_Code()
{
  return axios.get(Get_Room_Code_API)
}
