import { CircleHelp, Video, UserPlus, ArrowLeft, LogOut } from "lucide-react"
import { useUser, SignOutButton, UserButton } from "@clerk/clerk-react"
import { Card, CardContent } from "@/components/ui/card"
import { dark } from '@clerk/themes'

function Sign_Out_Button() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) return <></>

  return (
    <li className="flex items-center justify-center flex-row mr-[3vw] hover:opacity-65 transition-opacity">
      <SignOutButton redirectUrl={"/"}>
        <button className="flex items-center justify-center m-0 p-0 text-sec text-[1.40vw] border-none bg-transparent">
          <LogOut className="w-[1.40vw]"/>
        </button>
      </SignOutButton>
    </li>
  )
}

function Top_Bar() {
  return ( <>
    <ul className="flex items-center pt-[0.5vw] pb-[1vw] mb-[2.75vw] mt-0 mx-0 pl-[1.25vw] text-sec border-b-[0.09vw] border-neutral-950/65">
      <a href="/">
        <li className="flex items-center justify-center flex-row mr-[2vw] text-[1.20vw] hover:opacity-65 transition-all">
          <ArrowLeft className="w-[1.40vw]"/>
        </li>
      </a>

      <li className="flex items-center justify-center font-bold flex-row text-[1.40vw] ml-[1vw]">
        Home
      </li>

        <li className="flex items-center justify-center text-zinc-400 flex-row ml-[3vw] text-[1.40vw] mr-auto hover:text-sec transition-all">
          <a href="/events">
            Events
          </a>
        </li>

      <Sign_Out_Button />

      <li className="flex items-center justify-center flex-row mr-[3vw] text-[1.20vw] hover:opacity-65 transition-all">
        <CircleHelp className="w-[1.40vw]" />
      </li>

      <li className="flex items-center justify-center flex-row mr-[2vw] text-[1.4vw] scale-[0.9]">
        <UserButton appearance={{baseTheme: dark}} size />
      </li>
    </ul>
    </>
  )
}

function Options() {
  return (
    <center>
      <div className="font-bold text-[3.6vw] bg-gradient-to-r from-orange-200 to-ter bg-clip-text text-transparent inline-block mt-[-1vw] mb-[1vw]">
        Video-Conferencer
      </div>

      <div className="bg-black/70 rounded-[0.7vw] p-[0.7vw] mb-[2vw] text-ter saturate-[40%] opacity-65 max-w-[70vw] text-[1.2vw] text-center">
        <b> Tip: </b> Upon creating a video-conference you will be given a code 10
        character code that looks like so "xxx-xxxx-xxx". Give this code to a friend and once they enter in the
        same code <i>(make sure you include the dashes)</i> you will be connected!
      </div>

      <ul className="flex flex-row gap-[9vw] w-full justify-center text-ter saturate-[40%] text-[2vw]">

        <a href="/call">
          <Card className="bg-rose-200/20 border-0 hover:bg-rose-50/20 transition-colors">
            <CardContent className="p-[1.5vw]">
              <div className="h-[4vw] w-[4vw] rounded-full bg-rose-200/20 flex items-center justify-center">
                <Video className="h-[2vw] w-[2vw] text-rose-200" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-[0.5vw]">Create Meeting</h2>
                <p className="text-sm text-gray-400">Start a new video conference</p>
              </div>
            </CardContent>
          </Card>
        </a>

        <a href="/join">
          <Card className="bg-zinc-900/60 border-0 hover:bg-zinc-900/30 transition-colors">
            <CardContent className="p-[1.5vw]">
              <div className="h-[4vw] w-[4vw] rounded-full bg-zinc-700/20 flex items-center justify-center">
                <UserPlus className="h-[2vw] w-[2vw] text-rose-200" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-[0.5vw]">Join Meeting</h2>
                <p className="text-sm text-gray-400">Enter a 10 character code</p>
              </div>
            </CardContent>
          </Card>
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
