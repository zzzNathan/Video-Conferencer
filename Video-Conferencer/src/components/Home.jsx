import { CircleHelp, Video, UserPlus, ChevronLeft, LogOut } from "lucide-react"
import { useUser, SignOutButton, SignedIn, UserButton } from "@clerk/clerk-react"
import { dark } from '@clerk/themes'

function Sign_Out_Button() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) return <></>

  return (
    <li className="flex items-center justify-center flex-row mr-[3vw] hover:opacity-65 transition-opacity">
      <SignOutButton redirectUrl={"/"}>
        <button className="flex items-center justify-center m-0 p-0 text-sec text-[1.45vw] border-none bg-transparent">
          <LogOut className="w-[1.45vw]"/>
        </button>
      </SignOutButton>
    </li>
  )
}

function Top_Bar() {
  return ( <>
    <ul className="flex items-center pt-[0.5vw] pb-[1vw] mb-[1.5vw] mt-0 mx-0 pl-[1.25vw] text-sec">
      <a href="/">
        <li className="flex items-center justify-center flex-row mr-[2vw] text-ter text-[1.45vw] hover:opacity-65 transition-all">
          <ChevronLeft className="w-[1.45vw]"/>
        </li>
      </a>

      <li className="flex items-center justify-center flex-row font-bold mr-auto text-ter text-[1.45vw]">
        Home
      </li>

      <Sign_Out_Button />

      <li className="flex items-center justify-center flex-row mr-[3vw] text-[1.45vw] hover:opacity-65 transition-all">
        <CircleHelp className="w-[1.45vw]" />
      </li>

      <li className="flex items-center justify-center flex-row mr-[2vw]">
        <UserButton appearance={{baseTheme: dark}} />
      </li>
    </ul>
    </>
  )
}

function Options() {
  return (
    <center>
      <div className="font-bold text-[3.4vw] bg-gradient-to-r from-orange-200 to-ter bg-clip-text text-transparent inline-block mt-[-1vw] mb-[1vw]">
        Video-Conferencer
      </div>

      <div className="mb-[2vw] text-ter saturate-[40%] opacity-65 max-w-[70vw] text-[1.2vw] text-center">
        Upon creating a video-conference you will be given a code 10
        character code that looks like so "xxx-xxxx-xxx". Give this code to a friend and once they enter in the
        same code <i>(make sure you include the dashes)</i> you will be connected!
      </div>

      <ul className="flex flex-row gap-[15vw] w-full justify-center text-ter saturate-[40%] text-[2vw]">

        <a href="/call">
        <li className="flex flex-col items-center text-black bg-pink-300 rounded-[1vw] p-[1.2vw] hover:scale-[103%] transition-all">
          <div className="flex flex-row items-center gap-[0.9vw]">
            <Video className="w-[2vw]" /> Create
          </div>
          <div className="text-[1vw] mt-[0.5vw] opacity-75">
            Start a new meeting
          </div>
        </li>
        </a>

        <a href="/join">
        <li className="flex flex-col items-center bg-black rounded-[1vw] p-[1.2vw] hover:scale-[103%] transition-all">
          <div className="flex flex-row items-center gap-[0.9vw]">
            <UserPlus className="w-[2vw]" /> Join
          </div>
          <div className="text-[1vw] mt-[0.5vw] opacity-75 max-w-[15vw] text-center">
            Join a meeting by entering a 10 character code
          </div>
        </li>
        </a>
      </ul>
    </center>
  )
}

// Renders the home page
function Home()
{
  return ( <>
    <div className="bg-grad/20 h-screen">
      <Top_Bar />
      <Options />
    </div>
  </>)
}

export default Home
