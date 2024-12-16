import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ClerkProvider } from "@clerk/clerk-react" 
import Landing from "./components/Landing.jsx"
import Registration from "./components/Registration.jsx"
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import Video from "./components/Video.jsx"

// Path is an extension that goes after our URL,
// once this extension is written the corresponding
// React element will be loaded and rendered.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/registration",
    element: <Registration />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/video",
    element: <Video />
  }
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
  </ClerkProvider>
)
