import { ReactTyped } from "react-typed"
import { SignedOut, SignIn } from "@clerk/clerk-react"
import { dark } from "@clerk/themes"
import Navbar from "./Navbar" 
import "../styles/Login.sass"

// Makes the typing headline animation
function Headline () 
{
  return (
    <ReactTyped 
      className={"Headline"}
      strings={[
        "Welcome back :)",
	"Log back in here,",
      ]}
      typeSpeed={120}
      startDelay={30}
      loop
    >
    </ReactTyped>
  )
}

// Renders the login page
function Login () {
  return (
  <> 
    <Navbar />
    <Headline /> <br/> 
    <SignedOut> <center>

      <SignIn 
	signUpUrl="/registration"
	forceRedirectUrl="/home"
	appearance={{
	  baseTheme: dark,
          variables: {spacingUnit: "2vh"}
	}}
      />

    </center> </SignedOut>
  </>
  )
}

export default Login
