import CircleLoader from "react-spinners/CircleLoader"
import "../styles/Loading.sass"

function Loading()
{
  return (
    <div className="page">

      <h1> Loading... </h1> 

      <div className="break"></div>

      <CircleLoader
        color={"#B98DEE"}
	size={"10vw"}
      />

    </div>
  )
}

export default Loading
