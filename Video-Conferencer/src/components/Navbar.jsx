import { useUser, SignedIn } from '@clerk/clerk-react'
import { Settings } from 'lucide-react'

// Makes the navigation bar design a component must be inside
// a clerk provider
function Navbar()
{
  // If user isn't signed in then they can be redirected
  // to the registration page
  const { isSignedIn } = useUser()
  var link = "/registration"
  var text = "Get started"

  // If user is signed in then they can go straight
  // to the home page
  if (isSignedIn)
  {
    link = "/home"
    text = "Home"
  }

  return (
    <nav>
      <ul className="flex list-none m-0 p-0 text-[1.45vw] mb-[0.1vw] mt-[-0.5vw]">

        <li className="p-[1.25vw] text-sec"> <b> Video-Conferencer </b> </li>

	<li className="ml-[auto] p-[1.25vw] hover:opacity-65 transition-opacity text-sec saturate-50"> <a href={link}> {text} </a> </li>

	      <a href="https://video-conf-docs.vercel.app">
          <li className="p-[1.25vw] ml-[1vw] hover:opacity-65 transition-opacity text-sec saturate-50"> Docs </li>
				</a>

        <li className="p-[1.25vw] ml-[1vw] hover:opacity-65 transition-opacity text-sec saturate-50"> Help </li>

        <SignedIn>
        <a href="/settings">
        <li className="p-[1.25vw] ml-[1vw] hover:opacity-65 transition-opacity text-sec mt-[0.35vw] saturate-50"> <Settings className="w-[1.45vw]"/> </li>
        </a>
        </SignedIn>

      </ul>
    </nav>
  )
}

export default Navbar
