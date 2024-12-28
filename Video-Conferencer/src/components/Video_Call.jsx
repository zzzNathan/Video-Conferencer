import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Get_Stream_Token, Get_Call_Id, End_Call } from "./Query_Api.jsx"
import Loading from "./Loading.jsx"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import {
  Call,
  CallControls,
  StreamCall,
  StreamTheme,
  StreamVideo,
  SpeakerLayout,
  StreamVideoClient
} from "@stream-io/video-react-sdk"

const apiKey = import.meta.env.VITE_STREAM_API_KEY

const CREATE = true
const JOIN   = false

function Video_Call()
{
  // If we are joining call the code is passed via the url search params
  const Search_Params = new URLSearchParams(window.location.search)
  var   code          = Search_Params.get("code")
  var   create        = CREATE // Are we creating or joining the call

  // If a code was provided then we must be joining the call
  if (code !== null) create = JOIN

  // Get user details from Clerk, 
  // these take a second to load in 
  const { user, isLoaded } = useUser()

  // Get Stream token
  const {
    data:      Stream_Token, 
    isLoading: Stream_Token_Loading,
    error:     Stream_Token_Error

  } = useQuery({
    // user?.id only access the attribute id if
    // user isnt undefined
    queryKey: ["stream_token", user?.id], 
    queryFn:  () => Get_Stream_Token(user?.id),
    enabled:  !!isLoaded && !!user // Only run if Clerk is
	                           // loaded
  })

  // Get call code, There are 2 cases:
  // ----------------------------------
  // 1) The user is creating a call, in this case we must 
  //    retrieve a unique call code from our API.
  //
  // 2) The user is joining a call, in this case we take 
  //    the code inputted, it is found in the URL search 
  //    parameter "...?code=<...>".
  const {
    data:      Call_Code,
    isLoading: Call_Code_Loading,
    error:     Call_Code_Error

  } = useQuery({

    queryKey: ["call_id"],
    queryFn:  () => Get_Call_Id(),
    enabled: !!code, // Only run if code is null, that is no
                     // search parameter was passed into URL
    onSuccess: (Call_Code) => {
      code = Call_Code
    }

  })

  const [client, setClient] = useState()
  const [call, setCall]     = useState()

  // Setup GetStream video client once the token is initialised
  useEffect(() => {
	
    // If token isn't yet initialised don't do anything
    if (Stream_Token_Loading || Call_Code_Loading || !isLoaded || !!user) return

    // Initialise client and connect user
    const Stream_User   = { id: user.id, name: user.firstName }
    const Stream_Client = new StreamVideoClient({ apiKey, Stream_Token, Stream_User })
    Stream_Client.connectUser(Stream_User, token)

    // Create and join call
    const Stream_Call = Stream_Client.call("default", code)
    Stream_Call.join({ create: CREATE })

    setClient(Stream_Client)
    setCall(Stream_Call)

    // Disconnect user and leave call on cleanup
    return () => {
      client.disconnectUser()
      call.leave()
      setCall(undefined)
      setClient(undefined)
    }

  }, [Stream_Token])

  if (Stream_Token_Loading || Call_Code_Loading)
    return <Loading />

  return (
    <StreamVideo client={client}>
      <StreamTheme>

        <StreamCall call={call}>
          <SpeakerLayout participantsBarPosition="right"/>
          <CallControls />
        </StreamCall>

      </StreamTheme>
    </StreamVideo>  
  )
}

export default Video_Call
