import { ReactTyped } from "react-typed"
import { SignedOut, SignIn } from "@clerk/clerk-react"
import { dark } from "@clerk/themes"
import Navbar from "./Navbar"

// Makes the typing headline animation
function Headline ()
{
  return (
    <ReactTyped
      className={"relative text-[4vw] ml-[4vw] mb-[0.75vw] inline-block bg-gradient-to-r from-ter to-sec text-transparent bg-clip-text select-none"}
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
