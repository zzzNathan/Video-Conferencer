import { Settings, House, CircleHelp, Video, UserPlus } from "lucide-react"

function Top_Bar() 
{
  return (
    <ul className="flex pt-[0.5vw] pb-[1vw] mb-[1.5vw] mt-0 mx-0 pl-[1.25vw] text-sec">
      <li className="text-[1.65vw]"> <b> Video-Conferencer </b> </li>
      <li className="flex items-center justify-center flex-row gap-[.5vw] ml-[3vw] mr-auto text-ter text-[1.65vw] hover:opacity-65 transition-opacity">
        <House className="w-[1.65vw]" />
      </li>
      <li className="flex items-center justify-center flex-row gap-[.5vw] mr-[3vw] text-[1.65vw] hover:opacity-65 transition-opacity">
        <Settings className="w-[1.65vw]" />
      </li>
      <li className="flex items-center justify-center flex-row mr-[2vw] text-[1.65vw] hover:opacity-65 transition-opacity">
        <CircleHelp className="w-[1.65vw]" />
      </li>
    </ul>
  )
}

// Makes the create call and join call components
function Options() 
{
  return (
    <div className="flex flex-col items-center justify-center gap-[2vw] h-[80vh] w-[83vw] bg-[#2d2b38] rounded-[1.5vw] mx-auto border-[0.15vw] border-ter/10">
      <div className="text-sec font-bold text-[3vw] mt-[-3vw] bg-gradient-to-r from-sec to-ter bg-clip-text text-transparent inline-block"> 
        Start connecting with others! 
      </div>
      
      <div className="flex flex-row items-center justify-center gap-[2vw]">

        <a href="/call">
          <button className="flex items-center justify-center gap-[0.75vw] border-t-[0.15vw] rounded-[50vw] bg-sec text-black px-[2.5vw] py-[0.75vw] hover:border-[0.15vw] hover:scale-[1.05] transition-all text-[1.5vw]">
            <Video className="w-[1.5vw]" /> Create
          </button>
        </a>

	<a href="/join">
	 <button className="flex items-center justify-center gap-[0.75vw] border-gray-700 border-t-[0.15vw] text-[1.5vw] rounded-[50vw] bg-black text-sec px-[2.5vw] py-[0.75vw] hover:border-[0.15vw] hover:scale-[1.05] transition-all">
            <UserPlus className="w-[1.5vw]" /> Join
         </button>
	</a>
        
      </div>

    </div>
  )
}

// Renders the home page
function Home() 
{
  return (
    <>
      <Top_Bar />
      <Options />
    </> 
  )
}

export default Home
