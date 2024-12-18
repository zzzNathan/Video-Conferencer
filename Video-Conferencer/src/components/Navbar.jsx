import { useUser, SignOutButton } from '@clerk/clerk-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import "../styles/Navbar.sass"

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
        <li className="Navbar_Item"> <SignOutButton redirectUrl={"/"}>
	                               <button className="Sign_Out"> Sign out </button>
	                             </SignOutButton> </li>
        <li className="Navbar_Item">      Documentation          </li>
        <li className="Navbar_Item">      Help                   </li>
        <li className="Navbar_Item"> <FontAwesomeIcon icon={faCog} /> </li>
      </ul>
    </nav> 
  )
}

export default Navbar
