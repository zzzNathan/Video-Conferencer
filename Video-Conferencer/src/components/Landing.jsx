import Quotes from "../assets/Quote_Cards.svg"
import Navbar from "./Navbar.jsx"
import { Settings, MicIcon, VideoIcon } from "lucide-react"

function Landing()
{
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />

      <div className="inline-block mb-[1.6vw]"></div>

      <div className="bg-white/10 rounded-[1.5vw] mx-[5vw] mb-[30vh] saturate-[0.65]">

      <div className="flex flex-col items-center justify-center text-ter w-[90vw] rounded-t-[1.5vw] saturate-[.65] bg-white/10 h-[3vw]">
        <div className="text-[1.25vw] font-bold mr-auto ml-[1vw]">Start a video call today!</div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-[-1vw]">
        <h1 className="text-[8.3vw] font-bold bg-gradient-to-r from-ter to-sec text-transparent bg-clip-text mt-[4vw] inline-block saturate-150"> Video conferencing </h1>

        <h2 className="text-sec text-[2.5vw]"> like you've <span className="text-ter">never</span> seen it before </h2>
      </div>

      <div className="inline-block mb-[1vw]"></div>

      <div className="flex flex-row justify-center items-center space-x-[1.75vw]  p-0 mb-auto pointer-events-auto">
        <a href="/login"><button className="rounded-[50vw] bg-black/70 text-white px-[1.75vw] py-[0.7vw] hover:border-[0.15vw] hover:scale-[1.05] hover:bg-black transition-all shadow-[0_0_1vw_0.05vw_rgba(255,255,255,0.3)] text-[1.3vw]"> Login </button></a>

        <a href="/registration">
	        <button className="rounded-[50vw] bg-gradient-to-r from-ter to-sec/70 bg-gradient-to-bl from-bg/70 to-pink/70 text-black hover:border-[0.15vw] px-[1.75vw] border-t-[0.15vw] py-[0.7vw] transition-all text-[1.3vw] shadow-[0_0_1vw_0.05vw_rgba(255,255,255,0.3)]"> Sign up </button>
        </a>
      </div>

      <div className="flex flex-row items-center bg-black w-[90vw] gap-[1vw] h-[8.2vh] mt-[20vh] rounded-b-[1.5vw] px-[1vw]">
        <Settings className="text-white/50 mr-auto"/> <MicIcon className="text-white/50"/> <VideoIcon className="text-white/50" /> <div className="ml-auto text-ter"> Leave </div>
      </div>

      </div>
    </div>
  )
}

export default Landing
