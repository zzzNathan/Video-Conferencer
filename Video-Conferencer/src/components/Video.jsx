import { useUser } from "@clerk/clerk-react"
import { StreamVideoClient } from "@stream-io/video-react-sdk"
import React, { useState, useEffect } from "react"
import axios from "axios"

const Api_Url = "https://stream-token-provider.jotkasongo.workers.dev/"
const apiKey = import.meta.env.STREAM_API_KEY

function Video() 
{
  const { user, isLoaded } = useUser()

  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [token, setToken]     = useState("")

  // Wait until Clerk is fully loaded
  useEffect(() => {
    const checkLoading = async () => 
    {
      while (!isLoaded) 
        await new Promise(resolve => setTimeout(resolve, 100))

      setLoading(false)
    }
    
    checkLoading()
  }, [isLoaded]) // Run effect on 'isLoaded' change

  // Once loaded, make API call if the user is available
  useEffect(() => {
    if (!loading && user)
    {
      const data = { "User_Id": user.id }

      axios.post(Api_Url, data)
        .then(response => {
          console.log("Success:", response.data)
          setToken(response.data.token)
        })
        .catch(error => {
          console.error("Error:", error)
          setError(error)
        })
    }
  }, [loading, user]) // Run effect when loading state or user changes

  if (loading) 
    return <div>Loading...</div> // Show loading state while waiting

  if (error) 
    return <div>Error: {error.message}</div> // Show error message if there's an error

  const client = new StreamVideoClient({ apiKey, token });

  return (
    <>
      <div>Video component is ready!</div>
    </>
  )
}

export default Video
