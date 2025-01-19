import { ChevronLeft, UserPlus } from "lucide-react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useState, useEffect } from "react"
import Video_Call from "./Video_Call"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

function Input_Code() {
  const [value, setValue] = useState("")
  const [clicked, Set_Clicked] = useState(false)

  useEffect(() => {
    if (clicked && value.length == 6)
      return <Video_Call code={value} />
  }, [value])

  return (
    <center>
      <a href="/home">
        <button className="flex flex-row items-center mr-auto p-[1.2vw] text-ter text-[1.45vw] hover:opacity-50 transition-all">
          <ChevronLeft className="w-[1.45vw]" /> Back
        </button>
      </a>

      <div className="flex flex-col items-center justify-center gap-[2vw] text-ter mt-[4.5vw] w-[31vw] pb-[1.75vw] rounded-[1.1vw] saturate-[.65] bg-white/10">
        <div className="flex flex-col items-center justify-center text-ter w-[31vw] rounded-t-[1.1vw] saturate-[.65] bg-white/10 h-[3vw]">
          <div className="text-[1.25vw] font-bold">Join meeting</div>
        </div>

        <div className="mx-auto text-ter/90 text-[1.5vw] mt-[-1.75vw] pt-[0.5vw]">
          Please enter the 6 digit meeting code
        </div>

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

        <button
          className="flex items-center justify-center gap-[0.75vw] border-gray-700 border-t-[0.15vw] text-[1.5vw] rounded-[50vw] bg-black/75 text-sec px-[2.5vw] py-[0.75vw] hover:border-[0.15vw] hover:scale-[1.05] hover:bg-black transition-all"
          onClick={() => Set_Clicked(true)}
        >
          <UserPlus className="w-[1.5vw]" /> Join
        </button>
      </div>
    </center>
  );
}

function Join_Call()
{
  return (
    <div className="bg-grad/20 h-screen">
      <Input_Code />
    </div>
  );
}

export default Join_Call;
