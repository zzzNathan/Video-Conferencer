import { Settings, Mic, CircleHelp, Video, Accessibility, UserPlus } from "lucide-react"
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react"

// Makes the top navigation bar component
function Top_Bar () 
{
  return (
    <ul className="flex pt-[0.5vw] pb-[1vw] mb-[1.5vw] mt-0 mx-0 pl-[1.25vw] text-sec">
      <li className="mr-auto text-[1.65vw]"> <b> Video-Conferencer </b> </li>

      <li className="mr-[3vw] text-[1.65vw] hover:opacity-65 transition-opacity">Home</li>
      <li className="mr-[3vw] text-[1.65vw] hover:opacity-65 transition-opacity">Settings</li>
      <li className="mr-[2vw] mt-[0.4vw] text-[1.65vw] hover:opacity-65 transition-opacity"> <CircleHelp /> </li>
    </ul>
  )
}

// Makes the side navigation bar component
function Side_Bar () 
{
  return (
    <></> 
  )
}

// Makes the create call and join call components
function Options()
{
  return (
    <div className="flex flex-col items-center justify-center gap-[2vw] h-[80vh] w-[82vw] bg-[#2d2b38] rounded-[1.5vw] mx-auto">

      <div className="text-sec font-bold text-[3vw] mt-[-3vw]"> Start connecting with others! </div>
      
      <div className="flex flex-row items-center justify-center gap-[2vw]">
      <a href="/call">
	<button className="flex items-center justify-center gap-[0.75vw] border-t-[0.15vw] rounded-[50vw] bg-sec text-black px-[2.5vw] py-[0.75vw] hover:border-[0.15vw] hover:scale-[1.05] transition-all">
	  <Video /> Create
	</button>
      </a>

      <a href="/login">
	<button className="flex items-center justify-center gap-[0.75vw] border-gray-700 border-t-[0.15vw] rounded-[50vw] bg-black text-sec px-[2.5vw] py-[0.75vw] hover:border-[0.15vw] hover:scale-[1.05] transition-all">
	  <UserPlus /> Join
	</button>
      </a>
      </div>

    </div>
  )
}

// Renders the home page
function Home() 
{
  const {isLoaded} = useUser()

  return (
    <> 
      <Top_Bar />
      <Side_Bar />
      <Options />

    </> 
  )
}

export default Home
