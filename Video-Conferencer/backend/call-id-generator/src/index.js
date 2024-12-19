const RESPONSE_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
}

export default
{
  async fetch(request, env)
  {
    return Provide_Token(request, env)
  }
}
