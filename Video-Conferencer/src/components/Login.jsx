import { ReactTyped } from "react-typed"
import { ClerkProvider, SignedOut, SignIn } from "@clerk/clerk-react"
import { dark } from "@clerk/themes"
import Navbar from "./Navbar" 
import "../styles/Login.sass"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function Headline () {
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

function Login () {
  return (
  <> <Navbar />
    <Headline /> 
    <br/> <br/> 
    
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SignedOut>
        <center>

	  <SignIn 
	    signUpUrl="/registration"
	    forceRedirectUrl="/home"
	    appearance={dark}
	  />

	</center>
      </SignedOut>
    </ClerkProvider> 
  </>
  )
}

export default Login
