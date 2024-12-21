import CircleLoader from "react-spinners/CircleLoader"

function Loading()
{
  return (
    <div className="flex justify-center items-center h-screen flex-wrap gap-[0.75vh]">

      <h1 className="text-sec font-bold text-[3vw]"> Loading... </h1> 

      <div className="h-0 basis-[100%]"></div>

      <CircleLoader
        color={"#B98DEE"}
	size={"10vw"}
      />

    </div>
  )
}

export default Loading
