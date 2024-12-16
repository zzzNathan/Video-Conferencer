import "../styles/Clock.sass"
import { useEffect, useState } from "react"

// Gets current date and time and continously updates it every second
function Clock ()
{
  const [currentDateTime, setCurrentDateTime] = useState("")

  const updateDateTime = () => {
    const now = new Date()

    // Get components of the date
    const day    = String(now.getDate()).padStart(2, "0")
    const month  = String(now.getMonth() + 1).padStart(2, "0")
    const year   = now.getFullYear()
    const hour   = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')
    const second = String(now.getSeconds()).padStart(2, '0')
    
    // Get the day name
    const options = { weekday: "long" }
    const dayName = now.toLocaleDateString("en-US", options).substring(0,3)

    // Format the date string
    setCurrentDateTime(`${day}-${month}-${year} ${dayName}\n
	                ${hour}:${minute}:${second}`)
  }

  useEffect(() => {
    updateDateTime()

    // Update every second
    const intervalId = setInterval(updateDateTime, 1000) 
    
    // Cleanup interval on unmount
    return () => clearInterval(intervalId)
  }, [])

  // Toggle the opacity of the clock when the user clicks on it
  const [opacity, setOpacity] = useState(1)
  const Toggle_Opacity = () => {
    setOpacity(prevOpacity => (prevOpacity === 0.1 ? 1 : 0.1))
  }
  
  // Render the clock
  return (
    <div
      className="Clock"
      onClick={Toggle_Opacity}
      style={{opacity: opacity}}>

      {currentDateTime}

    </div>
  )
}

export default Clock
