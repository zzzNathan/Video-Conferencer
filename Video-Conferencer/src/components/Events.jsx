import { CircleHelp, ArrowLeft, LogOut, X, Plus } from "lucide-react"
import { useUser, SignOutButton, UserButton } from "@clerk/clerk-react"
import { useState, useEffect } from "react"
import { dark } from '@clerk/themes'
import { Get_Events, Add_Event, Delete_Event } from "../utils/Query_Api"
import Loading from "./Loading"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  return (
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
  )
}

function Event_Item({ title, date, description, On_Delete }) {
  // Format the date to show only YYYY-MM-DD
  const formatted_date = new Date(date).toISOString().split('T')[0]

  return (
    <div className="bg-zinc-900/80 p-[1.5vw] rounded-[0.5vw] mb-[1vw] hover:bg-zinc-900/40 transition-colors relative group">
      <button
        onClick={On_Delete}
        className="absolute top-[1vw] right-[1vw] opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-[1.2vw] h-[1.2vw] text-zinc-400 hover:text-red-400 transition-colors"/>
      </button>
      <h2 className="text-white text-[1.2vw] font-semibold mb-[0.5vw]">{title}</h2>
      <p className="text-zinc-400 text-[1vw] mb-[0.5vw]">{formatted_date}</p>
      <p className="text-zinc-300 text-[0.9vw]">{description}</p>
    </div>
  )
}

function Add_Event_Button({ onClick }) {
  return (
    <button
      className="absolute bottom-[2vw] right-[2vw] bg-sec hover:bg-ter/80 transition-all rounded-full p-[1vw] shadow-lg hover:scale-110 active:scale-95"
      onClick={onClick}
    >
      <Plus className="w-[2vw] h-[2vw] text-black" />
    </button>
  )
}

function No_Events_Message() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-zinc-400 text-center">
        <p className="text-[1.4vw] mb-[1vw]">No events found</p>
        <p className="text-[1vw] text-zinc-500">
          Click the plus icon to create your first event!
        </p>
      </div>
    </div>
  )
}

function Events_Page() {
  const [events, Set_Events] = useState([])
  const [loading, Set_Loading] = useState(true)
  const [adding_event, Set_Adding_Event] = useState(false)
  const [error, Set_Error] = useState(null)
  const { user } = useUser()

  // Dialog state
  const [Open_Dialog, Set_Open_Dialog] = useState(false)
  const [New_Event, Set_New_Event] = useState({
    Title: "",
    Description: "",
    Date: ""
  })

  // Fetch events when component mounts or user changes
  useEffect(() => {
    async function Fetch_Events() {
      if (!user) return

      try {
        const response = await Get_Events(user.id)
        Set_Events(response.data || [])
        Set_Error(null)
      } catch (error) {
        console.error('Failed to fetch events:', error)
        Set_Error('Failed to load events')
        Set_Events([])
      } finally {
        Set_Loading(false)
      }
    }

    Fetch_Events()
  }, [user])

  const Handle_Add_Event = async () => {
    // Validate form
    if (!New_Event.Title || !New_Event.Description || !New_Event.Date) {
      Set_Error('Please fill in all fields')
      return
    }

    Set_Adding_Event(true)
    try {
      await Add_Event(
        user.id,
        New_Event.Title,
        New_Event.Description,
        New_Event.Date
      )

      // Refresh events list
      const response = await Get_Events(user.id)
      Set_Events(response.data || [])

      // Close dialog and reset form
      Set_Open_Dialog(false)
      Set_New_Event({ Title: "", Description: "", Date: "" })
      Set_Error(null)
    } catch (error) {
      console.error('Failed to add event:', error)
      Set_Error('Failed to add event')
    } finally {
      Set_Adding_Event(false)
    }
  }

  const Handle_Delete_Event = async (Event_Id) => {
    try {
      await Delete_Event(user.id, Event_Id)
      Set_Events(events.filter(event => event.Event_Id !== Event_Id))
    } catch (error) {
      console.error('Failed to delete event:', error)
    }
  }

  if (loading || !user) return <Loading />

  return ( <>
    <Top_Bar />

    <Dialog open={Open_Dialog} onOpenChange={Set_Open_Dialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            <div className="text-sec/70">Fill in the details for your new event</div>

            {error && (
              <div className="text-red-400 text-[1vw] mt-[1vw]">{error}</div>
            )}

            <div className="mt-[2vw] space-y-[1vw]">
              <div>
                <label className="text-sec text-[1vw]">Title</label>
                <input
                  type="text"
                  value={New_Event.Title}
                  onChange={(e) => Set_New_Event({...New_Event, Title: e.target.value})}
                  className="w-full p-[0.5vw] rounded bg-zinc-900 text-white text-[1vw]"
                  placeholder="Event title"
                  maxLength={50}
                />
              </div>

              <div>
                <label className="text-sec text-[1vw]">Description</label>
                <textarea
                  value={New_Event.Description}
                  onChange={(e) => Set_New_Event({...New_Event, Description: e.target.value})}
                  className="w-full p-[0.5vw] rounded bg-zinc-900 text-white text-[1vw]"
                  placeholder="Event description"
                  rows="3"
                  maxLength={200}
                />
              </div>

              <div>
                <label className="text-sec text-[1vw]">Date</label>
                <input
                  type="date"
                  value={New_Event.Date}
                  onChange={(e) => Set_New_Event({...New_Event, Date: e.target.value})}
                  className="w-full p-[0.5vw] rounded bg-zinc-900 text-white text-[1vw]"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <button
                onClick={Handle_Add_Event}
                disabled={adding_event}
                className="w-full bg-sec hover:bg-ter/80 text-black p-[0.75vw] rounded text-[1vw] transition-colors disabled:opacity-50"
              >
                {adding_event ? 'Adding...' : 'Add Event'}
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    <div className="flex justify-center items-center">
      <div className="w-[85vw] h-[80vh] rounded-[1vw] bg-slate-950 p-[1vw] relative">
        <h1 className="text-[3.5vw] text-left bg-gradient-to-r from-orange-200 to-ter bg-clip-text text-transparent inline-block font-bold">
          Upcoming events
        </h1>
        <h3 className="text-[1.3vw] text-ter/70 saturate-50 mb-[2vw]">
          Click on the plus icon to add an event, hover over an event and click the X to remove
          an event.
        </h3>

        <div className="overflow-y-auto h-[calc(70vh-8vw)] pr-[1vw]">
          {events.length === 0 ? (
            <No_Events_Message />
          ) : (
            events.map((event) => (
              <Event_Item
                key={event.Event_Id}
                title={event.Title}
                date={event.Date}
                description={event.Description}
                On_Delete={() => Handle_Delete_Event(event.Event_Id)}
              />
            ))
          )}
        </div>

        <Add_Event_Button onClick={() => Set_Open_Dialog(true)} />
      </div>
    </div>
  </> )
}

export default Events_Page
