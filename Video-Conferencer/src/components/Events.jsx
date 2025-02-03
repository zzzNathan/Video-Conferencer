import { CircleHelp, ArrowLeft, LogOut, X } from "lucide-react"
import { useUser, SignOutButton, UserButton } from "@clerk/clerk-react"
import { useState } from "react"
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

      <li className="flex items-center justify-center text-zinc-400 flex-row text-[1.40vw] ml-[1vw] hover:text-sec transition-all">
        <a href="/home">
          Home
        </a>
      </li>

        <li className="flex items-center justify-center font-bold flex-row ml-[3vw] text-[1.40vw] mr-auto">
          Events
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

// Renders an event item
function Event_Item({ title, date, description, On_Delete })
{
  return (
    <div className="bg-zinc-900/80 p-[1.5vw] rounded-[0.5vw] mb-[1vw] hover:bg-zinc-900/40 transition-colors relative group">
      <button
        onClick={On_Delete}
        className="absolute top-[1vw] right-[1vw] opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-[1.2vw] h-[1.2vw] text-zinc-400 hover:text-red-400 transition-colors"/>
      </button>
      <h2 className="text-white text-[1.2vw] font-semibold mb-[0.5vw]">{title}</h2>
      <p className="text-zinc-400 text-[1vw] mb-[0.5vw]">{date}</p>
      <p className="text-zinc-300 text-[0.9vw]">{description}</p>
    </div>
  )
}

// Renders the events component
function Events()
{
  // Example events data
  const [events, Set_events] = useState([
    {
      title: "Team Meeting",
      date: "2024-02-20",
      description: "Weekly team sync-up meeting"
    },
    {
      title: "Project Review",
      date: "2024-02-21",
      description: "Review of current project progress"
    },
    {
          title: "Project Review",
          date: "2024-02-21",
          description: "Review of current project progress"
        },
      {
            title: "Project Review",
            date: "2024-02-21",
            description: "Review of current project progress"
          },
  ])

  // Takes an index, and deletes that index
  // from the list of events
  const Delete_Event = (index) => {
    Set_events(events.filter((_, i) => i !== index))``
  }

  return ( <>
    <Top_Bar />

    <div className="flex justify-center items-center">
      <div className="w-[85vw] h-[80vh] rounded-[1vw] bg-slate-950 p-[1vw]">
        <h1 className="text-[3.5vw] text-left bg-gradient-to-r from-orange-200 to-ter bg-clip-text text-transparent inline-block font-bold"> Upcoming events </h1>
        <h3 className="text-[1.3vw] text-ter/70 saturate-50 mb-[2vw]">
          Click on the plus icon to add an event, hover over an event and click the X to remove
          an event.
        </h3>

        <div className="overflow-y-auto h-[calc(70vh-8vw)] pr-[1vw]">
          {events.map((event, index) => (
            <Event_Item
              number={index}
              title={event.title}
              date={event.date}
              description={event.description}
              On_Delete={() => Delete_Event(index)}
            />
          ))}
        </div>
      </div>
    </div>
  </> )
}

export default Events
