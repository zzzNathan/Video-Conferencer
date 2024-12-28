import { ChevronLeft, UserPlus } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useState } from "react"

// Function to join a call
function Enter_Call(code)
{
  // Code must be 6 digits
  if (code.length === 6)
    window.location.href = `/call?code=${code}`
}

function Input_Code()
{
  const [value, setValue] = useState("")

  return (
    <center>
    <a href="/home">
    <button className="flex flex-row items-center mr-auto p-[1.2vw] text-ter font-bold text-[1.7vw] hover:opacity-50 transition-all"><ChevronLeft className="w-[1.7vw]"/> Back </button>
    </a>

    <div className="flex flex-col items-center justify-center gap-[2vw] text-ter mt-[4.5vw] bg-[#2d2b38] w-[31vw] py-[1.75vw] border-[0.15vw] border-ter/10 rounded-[1.5vw]">

      <div className="mx-auto text-sec text-[4vw] text-ter font-bold">
	Join meeting
      </div>

      <div className="mx-auto text-sec/90 text-[1.5vw] mt-[-1.75vw]"> Enter the 6 digit meeting code </div>

      <InputOTP 
        maxLength={6} 
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <button className="flex items-center justify-center gap-[0.75vw] border-gray-700 border-t-[0.15vw] text-[1.5vw] rounded-[50vw] bg-black text-sec px-[2.5vw] py-[0.75vw] hover:border-[0.15vw] hover:scale-[1.05] transition-all" 
	  onClick={() => Enter_Call(value)}>
        <UserPlus className="w-[1.5vw]" /> Join
      </button>

    </div>
    </center>
  )
}

function Join_Call()
{
  return <Input_Code />
}

export default Join_Call
