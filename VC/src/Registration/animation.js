import Typed from "typed.js"

// Function to produce the typing animation.
function Animate_Headline() 
{
  const text = ["Welcome to Video-Conferencer!", "Let's get started..."]
  let typing = new Typed(".Headline", {
  strings:    text,
  loop:       true,
  startDelay: 30,
  typeSpeed:  100});
}

Animate_Headline()
