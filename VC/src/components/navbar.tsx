import React from "react"
@use ../styles/navbar.sass

function Navbar() 
{
  return (
    <nav class="Navbar">
      <ul class="Navbar_List">
        <li class="Navbar_Item"> <b>  Video-Conferencer </b> </li>
        <li class="Navbar_Item_Left"> Documentation          </li>
        <li class="Navbar_Item">      Help                   </li>
        <li class="Navbar_Item"> <i class="fas fa-cog"> </i> </li>
      </ul>
    </nav> 
  )
}

export Navbar
