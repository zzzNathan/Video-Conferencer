import "../styles/Home.sass"
import Clock from "./Clock.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"


function Top_Bar () {
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

function Side_Bar () {
  return (
    <>
      <ul className="Side_Nav">
	<li> </li>
      </ul>
    </>
  )
}

function Home () {
  return (
    <> <Top_Bar />
	
    <Clock /> 
    </> 
  )
}

export default Home
