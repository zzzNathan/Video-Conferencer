import Navbar from "./Navbar.jsx"
import { ChevronRight } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { useEffect, useState } from "react"

// Buttons to create account or sign back in
function New_User_Buttons()
{
  return (
    <div className="flex flex-row justify-center items-center space-x-[1.75vw] p-0 mb-auto pointer-events-auto">
      <a href="/login">
        <button className="rounded-[50vw] bg-black/70 text-white px-[1.75vw] py-[0.7vw] hover:border-[0.15vw] hover:scale-[1.05] hover:bg-black transition-all shadow-[0_0_1vw_0.05vw_rgba(255,255,255,0.3)] text-[1.3vw]">
          Login
        </button>
      </a>

      <a href="/registration">
        <button className="rounded-[50vw] bg-gradient-to-r from-ter to-sec/70 bg-gradient-to-bl from-bg/70 to-pink/70 text-black hover:border-[0.15vw] px-[1.75vw] border-t-[0.15vw] py-[0.7vw] transition-all text-[1.3vw] shadow-[0_0_1vw_0.05vw_rgba(255,255,255,0.3)]">
          Sign up
        </button>
      </a>
    </div>
  )
}

// Button to go to home page for users that are logged in
function Existing_User_Buttons()
{
  return (
    <div className="flex flex-row justify-center items-center space-x-[1.75vw] p-0 mb-auto pointer-events-auto">
      <a href="/home">
        <button className="rounded-[50vw] bg-black/70 text-white px-[1.75vw] py-[0.7vw] hover:border-[0.15vw] hover:scale-[1.05] hover:bg-black transition-all shadow-[0_0_1vw_0.05vw_rgba(255,255,255,0.3)] text-[1.3vw] flex items-center">
          Enter <ChevronRight className="w-[1.3vw]" />
        </button>
      </a>
    </div>
  )
}

// The status of 100ms servers
function Status()
{
  // True means servers are up, false means servers are down
  const [status, Set_status] = useState(true)

  useEffect(() => {
    const Get_Status = async () => {
      const response = await fetch('https://status.100ms.live/api/v2/status.json')
      const status_data = await response.json()

      if (status_data.status.description === "All Systems Operational") Set_status(true)
      else Set_status(false)
    }

    Get_Status()
  }, [])

  let status_blinker_style = "rounded-full ml-[0.5vw] w-[1vw] h-[1vw] "
  if (status) status_blinker_style += "bg-green-500 animate-pulse"
  else        status_blinker_style += "bg-red-500 animate-pulse"

  return (
    <center>
      <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-gradient-to-r from-neutral-950/60 to-blue-950/10 backdrop-blur-sm text-[1.1vw] font-medium text-white shadow-lg shadow-purple-500/10 w-fit mt-[3.5vw] mb-[-0.5vw] border-[0.07vw] border-slate-600">
        Server status: <div className={ status_blinker_style }> </div>
      </div>
    </center>
  )
}

// Render the landing page
function Landing()
{
  const { isSignedIn } = useUser()

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="inline-block mb-[1.4vw]"></div>

      <Status />
      <div className="flex flex-col items-center justify-center space-y-[-1vw] mb-[1vw]">
        <h1 className="text-[7.4vw] font-bold bg-gradient-to-r from-ter to-sec text-transparent bg-clip-text mt-[0.1vw] inline-block saturate-150"> Video conferencing </h1>

        <h2 className="text-sec text-[2.5vw]"> like you've <span className="text-ter">never</span> seen it before </h2>
      </div>

      <div className="inline-block mb-[1vw]"></div>

      {isSignedIn ? <Existing_User_Buttons /> : <New_User_Buttons />}
    </div>
  )
}

export default Landing
