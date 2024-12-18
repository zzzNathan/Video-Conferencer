function Error(message)
{
  return (
    <>
      <h1> You have encountered an error! </h1>
      <h2> {message} </h2>

      Please raise an issue on Github to make 
      the developer aware of this issue.
    </>
  )
}

export default Error
