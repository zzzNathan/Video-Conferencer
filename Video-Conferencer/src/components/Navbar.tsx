import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import "../styles/Navbar.sass"

function Navbar()
{
  return (
    <nav class="Navbar">
      <ul class="Navbar_List">
        <li class="Navbar_Item"> <b>  Video-Conferencer </b> </li>
        <li class="Navbar_Item_Left"> Documentation          </li>
        <li class="Navbar_Item">      Help                   </li>
        <li class="Navbar_Item"> <FontAwesomeIcon icon={faCog} /> </li>
      </ul>
    </nav> 
  )
}

export default Navbar
