import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import { Join_Video_Call } from "./Video_Call"
import { Input } from "@/components/ui/input"

function Title()
{
  return ( <>
    <div className="mx-[2vw] my-[2vw] text-ter">
      <a href="/home">
        <div className="text-ter mt-[2vw] ml-[-1vw] hover:opacity-50 transition-all"> <ChevronLeft className="w-[4vw]" />  </div>
      </a>
      <div className="text-[4vw] font-bold">Join meeting </div>
    </div>
  </>)
}

function Input_Code({ Value, Set_Value, Set_Clicked }) {
  return (
    <center>
      <div className="w-[40vw] h-[21vw] bg-black/70 rounded-[1.2vw]">
        <div className="text-ter pt-[0.5vw] font-bold text-[1.5vw] mb-[3vw]">
          Enter in your 10 character room code
        </div>

        <div className="flex flex-col items-start gap-[0.5vw] ml-[1.2vw] mb-[3vw]">
          <div className="font-bold text-ter">Code</div>
          <Input
            className="w-[25vw] bg-black/50 text-white border-gray-600 focus:border-white placeholder:text-gray-400"
            placeholder="xxx-xxxx-xxx"
            value={Value}
            onChange={(e) => Set_Value(e.target.value)}
          />
        </div>

        <button
          onClick={() => Set_Clicked(true)}
          className="rounded-[50vw] bg-black/90 text-white px-[1.75vw] py-[0.7vw] hover:border-[0.15vw] hover:scale-[1.05] hover:bg-black transition-all shadow-[0_0_1vw_0.05vw_rgba(255,255,255,0.3)] text-[1.3vw]"
        >
          Submit
        </button>

        <div className="text-ter pt-[0.9vw]"> Make sure to include the dashes! </div>
      </div>
    </center>
  )
}

function Join_Call() {
  const [Value, Set_Value] = useState('')
  const [Clicked, Set_Clicked] = useState(false)

  // If code is valid and clicked, render only the video call
  if (Value.length === 12 && Clicked) {
    return <Join_Video_Call code={Value} />
  }

  // Otherwise render the join interface
  return (
    <div className="bg-grad/20 h-screen">
      <Title />
      <Input_Code
        Value={Value}
        Set_Value={Set_Value}
        Set_Clicked={Set_Clicked}
      />

    </div>
  )
}

export default Join_Call
