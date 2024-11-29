const Typed = window.Typed;
const text  = ["Welcome to Video-Conferencer!", "Let's get started..."]; 

function Animate_Headline() {
  var typing = new Typed(".Headline", {
  strings: text,
  loop: true,
  startDelay: 30,
  typeSpeed: 100});
}

Animate_Headline();
