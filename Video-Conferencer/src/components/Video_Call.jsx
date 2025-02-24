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

export function Join_Video_Call({ code })
{
  return (
    <div className="h-[100vh]">
      <HMSPrebuilt roomCode={code} />
    </div>
  )
}

export function Video_Call()
{
  const [Open_Dialog, Set_Open_Dialog] = useState(false)
  useEffect(() => {
    Set_Open_Dialog(true)
  }, [])

  const [Host_Code, setHost_Code] = useState("NULL")
  const [Guest_Code, setGuest_Code] = useState("NULL")
  const [is_Loading, setIs_Loading] = useState(false)
  const [Main_Code, setMain_Code] = useState("NULL")

  // Fetches a host + guest code from our backend,
  // once both have been fetched the video conference can start
  // and we display a dialog box with the guest code.
  useEffect(() => {
    async function Fetch_Room_Code() {
      if (Host_Code === "NULL") {
        setIs_Loading(true)
        const response = await Get_Room_Code()

        setHost_Code(response.data.Host_Code)
        setGuest_Code(response.data.Guest_Code)
        setMain_Code(response.data.Host_Code)
        setIs_Loading(false)
      }
    }

    Fetch_Room_Code()
  }, [Host_Code])

  if (is_Loading || Main_Code === "NULL")
    return <Loading />

  return ( <>

    <Dialog open={Open_Dialog} onOpenChange={Set_Open_Dialog}>
      <DialogContent> <DialogHeader>
        <DialogTitle>Your 10 character call code</DialogTitle>
        <DialogDescription>
          <div className="text-sec/70"> Share this with others to have them join the video-conference! </div>

          <center>
            <div className="font-bold text-[3vw] text-sec mt-[2vw]">
              {Guest_Code}
            </div>
          </center>

        </DialogDescription>
      </DialogHeader> </DialogContent>
    </Dialog>

    <div className="h-[100vh]">
      <HMSPrebuilt roomCode={Main_Code} />
    </div>
  </> )
}
