import "../styles/Home.sass"
import Clock from "./Clock.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle, faCog, 
	 faCamera, faMicrophone, faMale } from "@fortawesome/free-solid-svg-icons"
import { useUser } from "@clerk/clerk-react"

// Makes the top navigation bar component
function Top_Bar () 
{
  return (
    <>
      <ul className="Top_Nav">
        <li> <b> V </b> </li>
	<li> Home       </li>
	<li> <FontAwesomeIcon icon={faQuestionCircle} /> </li>
      </ul>
    </>
  )
}

// Makes the side navigation bar component
function Side_Bar () 
{
  return (
    <>
      <ul className="Side_Nav">
	<center><li> <FontAwesomeIcon icon={faCog} /> </li></center><br/>
	<center><li> <FontAwesomeIcon icon={faCamera} /> </li></center><br/>
	<center><li> <FontAwesomeIcon icon={faMicrophone} /> </li></center><br/>
	<center><li> <FontAwesomeIcon icon={faMale} /> </li></center><br/>
      </ul>
    </>
  )
}

// Makes the create call and join call components
function Options ()
{
  const Create_Desc = <div className="Desc"> 
    Create a new video call, then invite others
    to join by giving them the call code given 
    to you once you start the call.
  </div>

  const Join_Desc = <div className="Desc"> 
    Enter the code given to you to join the 
    video call.
  </div>

  return (
    <ul className="Options">
      <li> <a href="/video">Create call</a> <br/> {Create_Desc} </li>
      <li> Join call   <br/> {Join_Desc}   </li>
    </ul>
  )
}

// Renders the home page
function Home () {
  const {isLoaded} = useUser()
  console.log(isLoaded)
  return (
    <> <Top_Bar />
    <Side_Bar />
    <Options />

    <Clock /> 
    </> 
  )
}

export default Home
