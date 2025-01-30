import { useUser } from '@clerk/clerk-react'
import { useState, useEffect } from 'react'

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
      <ul className="flex list-none m-0 p-0 text-[1.45vw] mb-[0.1vw] mt-[-0.5vw] border-b-[0.09vw] border-neutral-950/65">

        <li className="p-[1.25vw] text-sec"> <b> Video-Conferencer </b> </li>

        <li className="ml-[auto] p-[1.25vw] hover:opacity-65 transition-opacity text-sec saturate-50"> <a href={link}> {text} </a> </li>

	      <a href="https://video-conf-docs.vercel.app">
          <li className="p-[1.25vw] ml-[1vw] hover:opacity-65 transition-opacity text-sec saturate-50"> Docs </li>
				</a>

        <li className="p-[1.25vw] ml-[1vw] hover:opacity-65 transition-opacity text-sec saturate-50"> Help </li>
      </ul>
    </nav>
  )
}

export default Navbar
