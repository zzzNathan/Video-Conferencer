import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ClerkProvider } from "@clerk/clerk-react" 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "./index.css"

import Landing from "./components/Landing.jsx"
import Login from "./components/Login.jsx"
import Registration from "./components/Registration.jsx"
import Home from "./components/Home.jsx"
import Video_Call from "./components/Video_Call.jsx"
import Join_Call from "./components/Join_Call.jsx"

// Path is an extension that goes after our URL,
// once this extension is written the corresponding
// React element will be loaded and rendered.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/registration",
    element:  <Registration />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/call",
    element: <Video_Call />
  },
  {
    path: "/join",
    element: <Join_Call />
  }
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const Query_Client    = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={Query_Client}>

  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
  </ClerkProvider>

  </QueryClientProvider>
)
