# Returning host and guest codes
Once we have got the room id, we would like to return the host and guest codes back to the user via HTTP. We
achieve this by writing the `Get_Room_Code()` function. In order to get these codes we have to make an API call to
100ms again.

We begin by generating a management token like the last function. Then we make a POST request to the URL
`https://api.100ms.live/v2/room-codes/room/<Room_ID_here>`. The request will look something like this:

```bash
curl --location --request GET 'https://api.100ms.live/v2/room-codes/room/<room_id>' \
--header 'Authorization: Bearer <management_token>'
```

In the response only 2 fields matter here.

```json{5,13}
{
    "limit": 20,
    "data": [
        {
            "code": "hkj-sdf-fda", // [!code focus]
            "room_id": "329d23d4f772854d9bf633df",
            "role": "host",
            "enabled": true,
            "created_at": "2023-03-03T11:41:08.082Z",
            "updated_at": "2023-03-03T11:41:08.082Z",
    	},
    	{
            "code": "wiw-giw-bzs", // [!code focus]
            "room_id": "329d23d4f772854d9bf633df",
            "role": "guest",
            "enabled": false,
            "created_at": "2023-03-03T11:41:08.082Z",
            "updated_at": "2023-03-03T11:41:08.082Z",
    	}
    ],
    "last": ""
}
```

Finally all we do is return these codes in a JSON object over HTTP.

```json
{
  "Host_Code": "hkj-sdf-fda",
  "Guest_Code": "wiw-giw-bzs"
}
```

# `Get_room_code()`
Returns the host code and the guest code given a room id, as well as any errors if any occured.

**Example:**

```go
Host_Code, Guest_Code, err = Get_room_code(Room_Id)
if err == nil {
	fmt.Println(Host_Code)  // Prints the host code e.g. hkj-sdf-fda
	fmt.Println(Guest_Code) // Prints the guest code e.g. wiw-giw-bzs
}
```

_Arguements:_
- Room_Id `string`.

Now on the front end all we have to do is call our API on our front end and connect to a video call using the host
code, and display the guest-code to the user so that they can invite their friends.

There are many ways to potentially achieve this, but after trial and error the method that I use on Video-Conferencer
is arguably the easist. In our front end we have a file `utils/Query_Api.jsx` where we have defined a function
`Get_Room_Code()` _(not to be confused with it's backend counter-part)_. All it does is call our API endpoint and
return the result.

```jsx
// Function to get a room code from our API
export async function Get_Room_Code() {
  return axios.get(Get_Room_Code_API)
}
```

We make the request in a `useEffect()` and once the result is returned we use the host or guest
code to start the video conference using the 100ms pre-built UI component.

Not only does the pre-built component make life a lot easier, since we don't have to make the UI
from scratch, it makes the code a lot shorter and makes it more maintainable. Here's what it looks like in practise:

```jsx
export function Video_Call() {
  return (
    <div className="h-[100vh]">
      <HMSPrebuilt roomCode={code} />
    </div>
  )
}
```
