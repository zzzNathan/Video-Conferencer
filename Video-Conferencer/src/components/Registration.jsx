import { ReactTyped } from "react-typed"
import { ClerkProvider, SignedOut, SignUp,
         SignedIn } from "@clerk/clerk-react"
import { dark } from "@clerk/themes"
import Navbar from "./Navbar" 
import "../styles/Registration.sass"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

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

function Registration () {
  return (
  <> <Navbar />
    <Headline />
    
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
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
    </ClerkProvider>
  </>
  )
}

export default Registration
