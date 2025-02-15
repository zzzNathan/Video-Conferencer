import { ReactTyped } from "react-typed"
import { SignedOut, SignUp } from "@clerk/clerk-react"
import { dark } from "@clerk/themes"
import Navbar from "./Navbar"

// Makes the headline typing animation a component
function Headline()
{
  return (
    <ReactTyped
      className={"relative text-5xl ml-12 leading-snug mb-2 inline-block bg-gradient-to-r from-ter to-sec text-transparent bg-clip-text select-none"}
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
function Registration()
{
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
          variables: { spacingUnit: "2vh" }
        }}
 	    />

      </center>
    </SignedOut>
  </>
  )
}

export default Registration
