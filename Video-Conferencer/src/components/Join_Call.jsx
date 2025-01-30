import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { Join_Video_Call } from "./Video_Call"
import { Input } from "@/components/ui/input"

function Input_Code({ Value, Set_Value, Set_Clicked }) {
  return (
    <div className="w-full flex justify-center mt-[20vh]">
      <div className="w-[30vw]">
        <h1 className="text-ter font-bold text-[2.5vw]"> Join call </h1>
        <h2 className="text-ter/75 saturate-[65%] mb-[0.75vw]"> Enter in your 10 character code. </h2>
        <Input
          className="w-[30vw] bg-black/50 text-white border-gray-600 focus:border-white placeholder:text-gray-400 mb-[2.3vw]"
          placeholder="xxx-xxxx-xxx"
          value={Value}
          onChange={(e) => Set_Value(e.target.value)}
        />
        <button
          className="w-[30vw] h-[5vh] bg-sec/70 rounded-[0.5vw] hover:bg-sec transition-all mb-[0.5vw]"
          onClick={() => Set_Clicked(true)}
        >
          Join
        </button>

        <div className="text-ter/75 saturate-[65%] mb-[0.75vw]"> <i> Make sure you include the dashes! </i> </div>
      </div>
    </div>
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
  return ( <>
    <div className="border-b-[0.09vw] border-neutral-950/65">
      <a href="/home">
        <ArrowLeft className="w-[2vw] m-[1vw] text-ter/60 hover:text-ter/40 transition-all" />
      </a>
    </div>

    <Input_Code
      Value={Value}
      Set_Value={Set_Value}
      Set_Clicked={Set_Clicked}
    />
  </>
  )
}

export default Join_Call
