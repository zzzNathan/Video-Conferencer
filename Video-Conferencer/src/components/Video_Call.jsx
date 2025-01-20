import { useEffect, useState } from "react"
import { Get_Room_Code } from "../utils/Query_Api.jsx"
import Loading from "./Loading.jsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { HMSPrebuilt } from '@100mslive/roomkit-react'

export default function Video_Call({ code = "NULL" })
{
  // State of the dialog box
  const [Open_Dialog, Set_Open_Dialog] = useState(false)
  useEffect(() => {
    Set_Open_Dialog(true)
  }, [])

  const [Host_Code, setHost_Code] = useState(code)
  const [Guest_Code, setGuest_Code] = useState(code)
  const [isLoading, setIsLoading] = useState(false)
  const [Main_Code, setMain_Code] = useState(code)

  // Get room code if user is creating a call
  useEffect(() => {
    async function Fetch_Room_Code() {
      if (code === "NULL") {
        setIsLoading(true)
        const response = await Get_Room_Code()

        setHost_Code(response.data.Host_Code)
        setGuest_Code(response.data.Guest_Code)
        setMain_Code(response.data.Host_Code)
        setIsLoading(false)
      }
    }

    Fetch_Room_Code()
  }, [code])

  if (isLoading || Main_Code === "NULL")
    return <Loading />

  return ( <>

    <Dialog open={Open_Dialog} onOpenChange={Set_Open_Dialog}>
      <DialogContent> <DialogHeader>
        <DialogTitle>Your 6 digit call code</DialogTitle>
        <DialogDescription>
          <div className="text-sec/70"> Share this with others to have them join the video-conference! </div>

          <center><div className="font-bold text-[3vw] text-sec mt-[2vw]">
            {Guest_Code}
          </div></center>

        </DialogDescription>
      </DialogHeader> </DialogContent>
    </Dialog>

    <div className="h-[100vh]">
      <HMSPrebuilt roomCode={Main_Code} />
    </div>
  </> )
}
