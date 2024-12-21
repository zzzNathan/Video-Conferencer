import { useUser, SignOutButton } from '@clerk/clerk-react'
import { Settings } from 'lucide-react'

// Renders the sign out option only if the user is currently 
// signed in
function Sign_Out_Button()
{
  const { isSignedIn } = useUser()

  // If user isn't signed in return an empty HTML element
  if (!isSignedIn) return <></>

  return (
    <li className="hover:opacity-65 transition-opacity"> 
      <SignOutButton redirectUrl={"/"}>
        <button className="p-[1.25vw] m-0 p-0 text-sec saturate-50 text-[1.75vw] border-none bg-transparent"> Sign out </button>
      </SignOutButton> 
    </li>
  )
}

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
      <ul className="flex list-none m-0 p-0 text-[1.75vw] mb-[0.1vw]">

        <li className="p-[1.25vw] text-sec"> <b> Video-Conferencer </b> </li>

	<li className="ml-[auto] p-[1.25vw] hover:opacity-65 transition-opacity bg-gradient-to-r from-[#f8c1a0] to-ter text-transparent bg-clip-text"> <a href={link}> {text} </a> </li>

	<Sign_Out_Button /> 

        <li className="p-[1.25vw] hover:opacity-65 transition-opacity text-sec saturate-50"> Docs </li>

        <li className="p-[1.25vw] hover:opacity-65 transition-opacity text-sec saturate-50"> Help </li>

        <li className="p-[1.25vw] hover:opacity-65 transition-opacity text-sec mt-[0.35vw] saturate-50"> <Settings /> </li>

      </ul>
    </nav> 
  )
}

export default Navbar
