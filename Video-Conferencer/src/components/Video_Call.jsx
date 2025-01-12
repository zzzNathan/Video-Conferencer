import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { Get_Stream_Token, Get_Call_Id, End_Call } from "../utils/Query_Api.jsx"
import Loading from "./Loading.jsx"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
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
  // State of the dialog box
  const [Open_Dialog, Set_Open_Dialog] = useState(false)
  useEffect(() => {
    Set_Open_Dialog(true)
  }, [])

  // State of the call code that is to be displayed to user
  const [Display_Code, Set_Display_Code] = useState()

  // If we are joining call the code is passed via the url search params
  const [Search_Params, Set_Search_Params] = useSearchParams()
  var   code          = Search_Params.get("code")
  var   creating      = CREATE // Are we creating or joining the call

  // If a code was provided then we must be joining the call
  if (code !== null)
    creating = JOIN

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
    enabled: !code && creating==CREATE, // Only run if code is null, that is no
                     // search parameter was passed into URL
    onSuccess: (Call_Code) => {
      code = Call_Code.toString()
      Set_Display_Code(Call_Code)
      Search_Params.set("code", Call_Code)
      Set_Search_Params(Search_Params)
    }

  })

  // Update Display_Code when Call_Code changes
  useEffect(() => {
    if (Call_Code) {
      Set_Display_Code(Call_Code)

      const params = new URLSearchParams(Search_Params)
      params.set("code", Call_Code)
      Set_Search_Params(params)
    }
  }, [Call_Code])

  const [client, setClient] = useState()
  const [call, setCall]     = useState()

  // Setup GetStream video client once the token is initialised
  useEffect(() => {

    // If token isn't yet initialised don't do anything
    if (Stream_Token_Loading || Call_Code_Loading || !isLoaded || !user) return

    // Initialise client and connect user
    const Stream_User   = { id: user.id, name: user.firstName }
    const Stream_Client = new StreamVideoClient({ apiKey, Stream_Token, Stream_User })

    Stream_Client.connectUser(Stream_User, Stream_Token)

    // Create and join call
    const Stream_Call = Stream_Client.call("default", code)
    Stream_Call.getOrCreate()

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
    <>
      <Dialog open={Open_Dialog} onOpenChange={Set_Open_Dialog}>
        <DialogContent> <DialogHeader>
          <DialogTitle>Your 6 digit call code</DialogTitle>
          <DialogDescription>
            <div className="text-sec/70"> Share this with others to have them join the video-conference! </div>

            <center><div className="font-bold text-[3vw] text-sec mt-[2vw]">
              {Display_Code}
            </div></center>

         </DialogDescription>
        </DialogHeader> </DialogContent>
      </Dialog>

    <StreamVideo client={client}>
      <StreamTheme>

        <StreamCall call={call}>
          <SpeakerLayout participantsBarPosition="right"/>
          <CallControls />
        </StreamCall>

      </StreamTheme>
    </StreamVideo>
    </>
  )
}

export default Video_Call
