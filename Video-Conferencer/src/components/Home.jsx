import { Settings, CircleHelp, Video, UserPlus, ChevronLeft, LogOut } from "lucide-react"
import { useUser, SignOutButton } from '@clerk/clerk-react'
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Renders the sign out option only if the user is currently
// signed in
function Sign_Out_Button()
{
  const { isSignedIn } = useUser()

  // If user isn't signed in return an empty HTML element
  if (!isSignedIn) return <></>

  return (
    <li className="mr-[3vw] flex items-center justify-center flex-row hover:opacity-65 transition-opacity">
      <SignOutButton redirectUrl={"/"}>
        <button className="m-0 p-0 text-sec text-[1.65vw] border-none bg-transparent"> <LogOut className="w-[1.65vw]"/> </button>
      </SignOutButton>
    </li>
  )
}

function Top_Bar()
{
  return (
    <ul className="flex pt-[0.5vw] pb-[1vw] mb-[1.5vw] mt-0 mx-0 pl-[1.25vw] text-sec">
      <a href="/">
        <li className="flex items-center justify-center flex-row mr-[2vw] text-ter text-[1.65vw] hover:opacity-65 transition-all mt-[0.25vw]">
          <ChevronLeft className="w-[1.65vw]"/>
        </li>
      </a>
      <li className="flex items-center justify-center flex-row font-bold mr-auto text-ter text-[1.65vw]">
        Home
      </li>
      <Sign_Out_Button />
      <li className="flex items-center justify-center flex-row mr-[3vw] text-[1.65vw] hover:opacity-65 transition-all">
        <Settings className="w-[1.65vw]" />
      </li>
      <li className="flex items-center justify-center flex-row mr-[2vw] text-[1.65vw] hover:opacity-65 transition-all">
        <CircleHelp className="w-[1.65vw]" />
      </li>
    </ul>
  );
}

// Makes the create call and join call components
function Options()
{
  return (
    <div className="flex flex-col items-center justify-start gap-[2vw] h-[80vh] w-[83vw] rounded-[1.5vw] mx-auto saturate-[.65] bg-white/10">
      <div className="flex flex-col items-center justify-center text-ter w-[83vw] rounded-t-[1.5vw] saturate-[.65] bg-white/10 h-[3vw]">
        <div className="text-[1.25vw] font-bold mr-auto ml-[1vw]">Meetings</div>
      </div>

      <div className="text-sec font-bold text-[3vw] bg-gradient-to-r from-orange-200 to-ter bg-clip-text text-transparent inline-block mt-[15vh]">
        Start connecting with others!
      </div>

      <div className="flex flex-row items-center justify-center gap-[2vw]">
        <a href="/call">
          <button className="flex items-center justify-center gap-[0.75vw] border-gray-700 border-t-[0.15vw] text-[1.5vw] rounded-[50vw] bg-black/75 text-sec px-[2.5vw] py-[0.75vw] hover:border-[0.15vw] hover:scale-[1.05] hover:bg-black transition-all">
            <Video className="w-[1.5vw]" /> Create
          </button>
        </a>

        <a href="/join">
          <button className="flex items-center justify-center gap-[0.75vw] border-gray-700 border-t-[0.15vw] text-[1.5vw] rounded-[50vw] bg-black/75 text-sec px-[2.5vw] py-[0.75vw] hover:border-[0.15vw] hover:scale-[1.05] hover:bg-black transition-all">
            <UserPlus className="w-[1.5vw]" /> Join
          </button>
        </a>
      </div>
    </div>
  );
}

// Renders the home page
function Home()
{
  // State of the dialog box
  const [Open_Dialog, Set_Open_Dialog] = useState(false)
  useEffect(() => {
    Set_Open_Dialog(true)
  }, [])

  return ( <>
    <Dialog open={Open_Dialog} onOpenChange={Set_Open_Dialog}>
      <DialogContent> <DialogHeader>
        <DialogTitle>Your 6 digit call code</DialogTitle>
        <DialogDescription>
          Share this with others to have them join the video-conference!

          <center><div className="font-bold text-[3vw] text-black mt-[2vw]">
            123456
          </div></center>

        </DialogDescription>
      </DialogHeader> </DialogContent>
    </Dialog>

    <div className="bg-grad/20 h-screen">
      <Top_Bar />
      <Options />
    </div>
  </>)
}

export default Home;
