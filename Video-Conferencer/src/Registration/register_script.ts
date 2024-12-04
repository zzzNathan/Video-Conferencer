import React from "react"
import { Clerk } from "@clerk/clerk-js"
import { dark } from "@clerk/themes"

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(publishableKey)
await clerk.load()

// Add sign up button 
const Sign_Up_Button = document.getElementById("sign-up")
clerk.mountSignUp(Sign_Up_Button, {
  onSuccess: (signUp) => {
    window.location.href = "../Main/main.html"
  }
})
