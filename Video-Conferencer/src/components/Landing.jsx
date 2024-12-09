import Button from "./Button"
import Navbar from "./Navbar"
import Quotes from "../assets/Quote_Cards.svg"
import "../styles/Landing.sass"

function Landing () {
  return (
    <> <Navbar /> 
    
      <div className="Main_Graphic">
        <h1 className="Main_Headline"> Video conferencing... </h1>

        <h2 className="Sub_Headline"> like you've <i>
        <span className="Pink_Text"> never </span> </i> seen it before </h2>

      <div className="Buttons">
        <a href="/login"><button className="Login_Button"> Login </button></a>
        <a href="/registration"><Button /></a>
      </div>

      <img className="Quote_Card" src={Quotes} /> 
    </div> </>
  )
}

export default Landing
