import { useUser, SignOutButton } from '@clerk/clerk-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import "../styles/Navbar.sass"

// Renders the sign out option only if the user is currently 
// signed in
function Sign_Out_Button()
{
  const { isSignedIn } = useUser()

  // If user isn't signed in return an empty HTML element
  if (!isSignedIn) return <></>

  return (
    <li className="Navbar_Item"> 
      <SignOutButton redirectUrl={"/"}>
        <button className="Sign_Out"> Sign out </button>
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
    <nav className="Navbar">
      <ul className="Navbar_List">

        <li className="Navbar_Item"> <b>  Video-Conferencer </b> </li>

	<li className="Navbar_Item_Left"> <a href={link}> <span className="Gradient"> {text} </span> </a> </li>

	<Sign_Out_Button /> 

        <li className="Navbar_Item">      Documentation          </li>

        <li className="Navbar_Item">      Help                   </li>

        <li className="Navbar_Item"> <FontAwesomeIcon icon={faCog} /> </li>

      </ul>
    </nav> 
  )
}

export default Navbar
