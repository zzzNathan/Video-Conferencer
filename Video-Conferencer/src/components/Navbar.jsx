import { useUser } from '@clerk/clerk-react'
import { useState, useEffect } from 'react'

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

  let status_blinker_style = "rounded-full ml-[8px] w-[14px] h-[14px] "
  if (status) status_blinker_style += "bg-green-500 animate-pulse"
  else        status_blinker_style += "bg-red-500 animate-pulse"

  return (
    <center>
      <div className="inline-flex items-center rounded-full px-4 py-1 bg-gradient-to-r from-neutral-950/60 to-blue-950/10 backdrop-blur-sm text-sm  text-white/80 shadow-lg shadow-purple-500/10 w-fit border-[1px] border-slate-600">
        Server status: <div className={ status_blinker_style }> </div>
      </div>
    </center>
  )
}

// Makes the navigation bar design a component must be inside
// a clerk provider
function Navbar() {
  // If user isn't signed in then they can be redirected
  // to the registration page
  const { isSignedIn } = useUser()
  const [link, Set_link] = useState("/registration")
  const [text, Set_text] = useState("Get started")

  // Do this action whenever isSignedIn updates, this occurs when Clerk hasn't loaded in
  // properly
  useEffect(() => {
    // If user is signed in then they can go straight
    // to the home page
    if (isSignedIn)
    {
      Set_link("/home")
      Set_text("Home")
    }
  }, [isSignedIn])

  return (
    <nav>
      <ul className="flex list-none m-0 p-0 text-sm mb-[4px] border-neutral-950/65">

        <a href="/">
          <li className="py-4 px-6 text-sec"> <b> Video-Conferencer </b> </li>
        </a>

        <li className="py-4 px-6 flex-1 flex items-center justify-center"> <Status /> </li>

        <li className="py-4 px-6 ml-[auto] p-4 hover:opacity-65 transition-opacity text-sec saturate-[75%]"> <a href={link}> {text} </a> </li>

	      <a href="https://video-conf-docs.vercel.app">
          <li className="py-4 px-6 hover:opacity-65 transition-opacity text-sec saturate-[75%]"> Docs </li>
				</a>

        <li className="py-4 px-6 hover:opacity-65 transition-opacity text-sec saturate-[75%]"> Help </li>
      </ul>
    </nav>
  )
}

export default Navbar
