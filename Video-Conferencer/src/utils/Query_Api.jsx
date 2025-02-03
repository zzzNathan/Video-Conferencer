import axios from "axios"

const Get_Room_Code_API = "https://call-manager-alpha.vercel.app/api/provider"
const Events_API = "https://event-manager-blush.vercel.app/api/events"

// Function to get a room code from our API
export async function Get_Room_Code()
{
  return axios.get(Get_Room_Code_API)
}

// Function to get a person's events
export async function Get_Events(User_Id)
{
  return axios.post(Events_API, {}, {
    headers: {
      'User_Id': User_Id,
      'Content-Type': 'application/json'
    }
  })
}

// Function to add an event
export async function Add_Event(User_Id, Title, Description, date) {
  const formatted_date = new Date(date).toISOString()

  const response = await axios.put(Events_API, {
    Title: Title,
    Description: Description,
    Date: formatted_date
  }, {
    headers: {
      'User_Id': User_Id,
      'Content-Type': 'application/json'
    }
  })

  return response.data
}

// Function to delete an event
export async function Delete_Event(User_Id, Event_Id) {
  const response = await axios.delete(Events_API, {
    headers: {
      'User_Id': User_Id,
      'Event_Id': Event_Id,
      'Content-Type': 'application/json'
    }
  })

  return response.data
}
