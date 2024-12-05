import React from "react"
import Navbar from "navbar.tsx"
@use "../styles/styles_index.sass"

export default function Home()
{
  return (
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title> Video-Conferencer </title>
  </head>

  <body>

    <Navbar><Navbar />
  
    <br><br>

    <div class="Main_Graphic">

      <h1 class="Headline"> Video conferencing... </h1>

      <h2 class="Sub_Headline"> like you've <i>
        <span class="Pink_Text"> never </span> </i>
        seen it before </h2>

     <button class="Button"><b>Sign Up</b></button>
    </div>

    <object data="images/Quote_cards.svg" type="image/svg+xml" 
            class="Quote_Card">
      <img src="images/Quote_cards.png"/>
    </object>

  </body>
  )
}

const domNode = document.getElementById('root')
const root = createRoot(domNode)
root.render(<Home />)
