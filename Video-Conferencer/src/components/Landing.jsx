import Navbar from "./Navbar.jsx"
import { ChevronRight } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'

// Buttons to create account or sign back in
function New_User_Buttons()
{
  return (
    <div className="flex flex-row items-center space-x-7 p-0 pointer-events-auto">
      <a href="/login">
        <button className="rounded-full bg-black/70 text-white px-7 py-3 hover:border-[2px] hover:scale-105 hover:bg-black transition-all shadow-[0_0_16px_1px_rgba(255,255,255,0.3)] text-[16px]">
          Login
        </button>
      </a>

      <a href="/registration">
        <button className="rounded-full bg-gradient-to-r from-ter to-sec/70 bg-gradient-to-bl from-bg/70 to-pink/70 text-black hover:border-[2px] px-7 border-t-[2px] py-3 transition-all text-[16px] shadow-[0_0_16px_1px_rgba(255,255,255,0.3)]">
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
    <div className="flex flex-row items-center space-x-7 p-0 pointer-events-auto">
      <a href="/home">
        <button className="rounded-full bg-black/70 text-white px-7 py-3 hover:border-[2px] hover:scale-105 hover:bg-black transition-all shadow-[0_0_16px_1px_rgba(255,255,255,0.3)] text-[18px] flex items-center">
          Enter <ChevronRight className="w-5" />
        </button>
      </a>
    </div>
  )
}

// Render the landing page
function Landing()
{
  const { isSignedIn } = useUser()

  return (
    <div className="w-screen h-screen flex flex-col leading-snug">
      <Navbar />

      <div className="flex flex-col">
        <h1 className="text-7xl ml-6 mt-24 mb-4 font-bold bg-gradient-to-r from-ter to-sec text-transparent bg-clip-text inline-block saturate-150 flex flex-col">
          <span> Simplifying </span>
          <span> video calls for all</span>
        </h1>

        <h2 className="text-sec saturate-[30%] ml-12 mb-10 text-xl w-[1024px] flex flex-col">
          <span>Video conferencing shouldn't be complicated.</span>
          <span>That's why we built Video-Conferencer with simplicity in mind.</span>
          <span>Open source, intuitive, and ready when you are.</span>
        </h2>
      </div>

      <div className="flex flex-row items-center ml-12">
        {isSignedIn ? <Existing_User_Buttons /> : <New_User_Buttons />}
      </div>
    </div>
  )
}

export default Landing
