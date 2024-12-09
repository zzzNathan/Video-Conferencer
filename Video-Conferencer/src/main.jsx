import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Landing from "./components/Landing.jsx"
import Registration from "./components/Registration.jsx"
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"

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
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
