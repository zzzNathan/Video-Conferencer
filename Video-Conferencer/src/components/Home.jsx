import { Video, UserPlus, ArrowLeft, LogOut } from "lucide-react"
import { useUser, SignOutButton, UserButton } from "@clerk/clerk-react"
import { Card, CardContent } from "@/components/ui/card"
import { dark } from "@clerk/themes"

function Sign_Out_Button() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) return <></>

  return (
    <li className="flex items-center justify-center flex-row mr-6 hover:opacity-65 transition-opacity">
      <SignOutButton redirectUrl={"/"}>
        <button className="flex items-center justify-center m-0 p-0 text-sec border-none bg-transparent">
          <LogOut className="w-[14px]"/>
        </button>
      </SignOutButton>
    </li>
  )
}

function Top_Bar() {
  return ( <>
    <ul className="flex items-center pt-2 pb-6 mt-0 px-6 mx-0 mb-6 text-sec">
      <a href="/">
        <li className="flex items-center justify-center flex-row mr-2 text-sm hover:opacity-65 transition-all">
          <ArrowLeft className="w-[14px]"/>
        </li>
      </a>

      <li className="flex items-center justify-center font-bold flex-row text-sm ml-6">
        Home
      </li>

        <li className="flex items-center justify-center text-zinc-400 flex-row ml-6 text-sm mr-auto hover:text-sec transition-all">
          <a href="/events">
            Events
          </a>
        </li>

      <Sign_Out_Button />

      <li className="flex items-center justify-center flex-row text-sm scale-[0.75]">
        <UserButton appearance={{baseTheme: dark}} size />
      </li>
    </ul>
    </>
  )
}

function Options() {
  return (
    <center>
      <div className="bg-black/70 rounded-[0.7vw] p-2 mb-6 text-ter saturate-[40%] opacity-65 w-[800px] border-[1px] border-sec/40 text-sm">
        <b> Tip: </b> Upon creating a video-conference you will be given a code 10
        character code that looks like so "xxx-xxxx-xxx". Give this code to a friend and once they enter in the
        same code <i>(make sure you include the dashes)</i> you will be connected!
      </div>

      <ul className="flex flex-row gap-6 w-full justify-center text-ter saturate-[40%]">
        <a href="/call">
          <Card className="bg-rose-200/20 border-0 hover:bg-rose-50/20 transition-colors">
            <CardContent className="h-48 w-96 p-6 flex flex-col gap-6">
              <div className="h-12 w-12 mb-[-8px] rounded-full bg-rose-200/20 flex items-center justify-center">
                <Video className="w-6 text-rose-200" />
              </div>

              <div className="flex flex-col items-start">
                <h2 className="text-xl font-semibold text-white mb-1">Create Meeting</h2>
                <p className="text-sm text-gray-400">Start a new video conference</p>
              </div>
            </CardContent>
          </Card>
        </a>

        <a href="/join">
          <Card className="bg-zinc-900/60 border-0 hover:bg-zinc-900/30 transition-colors">
            <CardContent className="h-48 w-96 p-6 flex flex-col gap-6">
              <div className="h-12 w-12 mb-[-8px] rounded-full bg-zinc-700/20 flex items-center justify-center">
                <UserPlus className="w-6 text-rose-200" />
              </div>

              <div className="flex flex-col items-start">
                <h2 className="text-xl font-semibold text-white mb-1">Join Meeting</h2>
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
    <div className="bg-[#201e29] h-screen">
      <Top_Bar />
      <Options />
    </div>
  </>)
}

export default Home
