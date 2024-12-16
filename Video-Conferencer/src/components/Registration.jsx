import { ReactTyped } from "react-typed"
import { SignedOut, SignUp, SignedIn } from "@clerk/clerk-react"
import { dark } from "@clerk/themes"
import Navbar from "./Navbar" 
import "../styles/Registration.sass"

// Makes the headline typing animation a component
function Headline () {
  return (
    <ReactTyped 
      className={"Headline"}
      strings={[
        "Welcome to Video-Conferencer",
	"Let's get started...",
      ]}
      typeSpeed={100}
      startDelay={30}
      loop
    >
    </ReactTyped>
  )
}

// Renders the registration page
function Registration () {
  return (
  <> 
    <Navbar />
    <Headline />
    
      <SignedOut>
        <center> 

	  <SignUp 
	    signInUrl="/login"
	    forceRedirectUrl="/home"
	    appearance={{
	      baseTheme: dark,
	      variables: {spacingUnit: "2vh"}
	    }}
	  />
	
	</center>
      </SignedOut>
  </>
  )
}

export default Registration
