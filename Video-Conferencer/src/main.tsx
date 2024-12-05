import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home.tsx"
import Registration from "./components/Registration.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/registration",
    element: <Registration />
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
