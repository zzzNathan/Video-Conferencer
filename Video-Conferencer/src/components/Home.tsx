import Button from "./Button.tsx"
import Navbar from "./Navbar.tsx"
import Quotes from "../assets/Quote_Cards.svg"
import "../styles/Home.sass"

function Home() {
  return (
    <> <Navbar /> 
    
      <div class="Main_Graphic">
        <h1 class="Headline"> Video conferencing... </h1>

        <h2 class="Sub_Headline"> like you've <i>
        <span class="Pink_Text"> never </span> </i> seen it before </h2>

      <Button /> 

      <img class="Quote_Card" src={Quotes} /> 
    </div> </>
  )
}

export default Home
