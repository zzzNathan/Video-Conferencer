import { Clerk } from "@clerk/clerk-js"

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(publishableKey)
await clerk.load()

// Add sign up button 
const Sign_Up_Button = document.getElementById("sign-up")
clerk.mountSignUp(Sign_Up_Button)
