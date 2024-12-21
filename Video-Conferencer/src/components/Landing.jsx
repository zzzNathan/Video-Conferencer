import Quotes from "../assets/Quote_Cards.svg"
import Navbar from "./Navbar.jsx"

// Code to render the landing page of our site
function Landing ()
{
  return (
    <div className="bg-gradient-to-b from-[#201e29] to-grad/40 h-screen flex flex-col">
      <Navbar />

      <div className="inline-block mb-[1vw]"></div>

      <div className="flex flex-col items-center justify-center space-y-[-1vw]">
        <h1 className="text-[7vw] font-bold bg-gradient-to-r from-ter to-sec text-transparent bg-clip-text"> Video conferencing... </h1>

        <h2 className="text-sec text-[2.5vw]"> like you've
        <span className="text-ter italic"> never </span> seen it before </h2>
      </div>

      <div className="inline-block mb-[1vw]"></div>

      <div className="flex flex-row justify-center items-center space-x-[1.75vw]  p-0 mb-auto pointer-events-auto">
        <a href="/login"><button className="rounded-[50vw] bg-black/70 text-white px-[1.75vw] py-[0.7vw] hover:border-[0.15vw] hover:scale-[1.05] hover:bg-black transition-all"> Login </button></a>
        <a href="/registration"><button className="rounded-[50vw] bg-gradient-to-r from-ter to-sec/70 bg-gradient-to-bl from-bg/70 to-pink/70 text-black hover:scale-[1.05] hover:border-[0.15vw] px-[1.75vw] border-t-[0.15vw] py-[0.7vw] transition-all"> Sign up </button></a>
      </div>

      <img className="translate-y-[1vw] w-[100vw]" src={Quotes} /> 
    </div>
      )
}

export default Landing
