/*import axios from "axios"
import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import {
  Call,
  CallControls,
  StreamCall,
  StreamTheme,
  StreamVideo,
  SpeakerLayout,
  StreamVideoClient
} from "@stream-io/video-react-sdk"
import "@stream-io/video-react-sdk/dist/css/styles.css"

const Api_Url = "https://stream-token-provider.jotkasongo.workers.dev/"
const apiKey  = import.meta.env.VITE_STREAM_API_KEY

function Video()
{
  const { user, isLoaded }    = useUser()
  const [loading, setLoading] = useState(true)
  const [token, setToken]     = useState("")
  const [client, setClient]   = useState()
  const [call, setCall]       = useState()

  // Generate the GetStream token using the user's ID from Clerk
  // once Clerk has loaded
  useEffect(() => {

    // if Clerk is not yet loaded don't do anything
    if (!isLoaded || !user) return
   
    // Fetch the token from our API
    const Get_Token = async (User_Id) => {
      const uuid = {"User_Id": User_Id}

      axios.post(Api_Url, uuid)
        .then(response => {setToken(response.data.token)})
        .catch(error   => {return Error(error.message)})
      
      setLoading(false)
    }

    Get_Token(user.id)

  }, [isLoaded, user])

  // Setup GetStream video client once the token is initialised
  useEffect(() => {
	
    // If token isn't yet initialised don't do anything
    if (token === "" || !isLoaded) return

    // Initialise client and connect user
    const Stream_User = { id: user.id, name: user.firstName }
    const Stream_Client = new StreamVideoClient({ apiKey, token, Stream_User })
    Stream_Client.connectUser(Stream_User, token)

    // Create and join call
    const Stream_Call = Stream_Client.call("default", "0")
    Stream_Call.join({ create: true })

    setClient(Stream_Client)
    setCall(Stream_Call)

    // Disconnect user and leave call on cleanup
    return () => {
      client.disconnectUser()
      call.leave()
      setCall(undefined)
      setClient(undefined)
    }

  }, [token])

  if (loading) return <div> loading... </div>

  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls />
        </StreamCall>
      </StreamTheme>
    </StreamVideo> 
  )
}*/

// Placeholder
function Video()
{
  return <></>
}

export default Video
