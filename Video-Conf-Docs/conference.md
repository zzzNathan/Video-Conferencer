# Video Conferencing
In this section I explain how I setup video conferencing on React using the 100ms library. But first we go through
some necessary definitions.

## Definitions
A **_room_** in 100ms is essentially a server where users can video conference. Each room has an
associated host and guest code. Guests can enter in the guest code to join, hosts can enter the
host code to join.

> [!Warning]
> Rooms in 100ms work in a rather _unintuitive_ manner. You may think that each time a user creates a video call we will
> create a new room then delete this room once they are done. However this is wrong!
>
> Actually in 100ms you **cannot** delete a room. They are no caps on creating rooms even for the free tier! So once
> a user ends their video call we **don't** have to delete the room that was created.
---

A **_template_** in 100ms is a predefined configuration for a room that specifies:
- The roles that can join (e.g., host, guest)
- The permissions for each role (e.g., who can share screen, record, etc.)
- The quality of video and audio streams
- The maximum duration of sessions
- The maximum number of participants allowed

Think of templates as blueprints that determine how your video conference rooms will behave. When creating a room,
you must associate it with a template, and that template's settings will apply to all participants who join that room.

> [!NOTE]
> Templates can be created and managed through the 100ms dashboard, where you can customize all these settings
> without writing any code.
---

A **_management_** token in 100ms is a secure authentication key that allows you to interact with the 100ms API.
It's required when:
- Creating new rooms
- Managing existing rooms
- Accessing room details
- Other administrative tasks

Think of it like an admin password that proves you have permission to manage rooms on your 100ms account. This token should be kept secure and only used in your backend code, never exposed to the client side.

> [!IMPORTANT]
> Management tokens expire after 24 hours and need to be regenerated. This is why we create a new token each time we
> make an API request.

## A high level walkthrough

### Creating a room
Start by creating an account at [100ms](https://www.100ms.live/). We create rooms using the 100ms API, by making a
POST request. The request should look like so,

```bash
curl --location --request POST 'https://api.100ms.live/v2/rooms' \
--header 'Authorization: Bearer <management_token>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "template_id": "<template_id>"
}'
```

The API response has a lot of fields but really only 1 field matters.

```json{2}
{
    "id": "631b2654f771854d9bf633df", // [!code focus]
    "name": "new-room-1662723668",
    "enabled": true,
    "description": "This is a sample description for the room",
    "customer_id": "627cdddff2e4e30487862ad1",
    "app_id":"62510797903d857ab8ec3ba5",
    "recording_info": {
        "enabled": false
    },
    "template_id": "63188115d11d6db790c73c60",
    "template": "sample-template-name",
    "region": "us",
    "created_at": "2022-09-09T11:41:08.082Z",
    "updated_at": "2022-09-09T11:41:08.074Z"
}
```

In our Go back-end I wrote the function `Create_Room()` to automate this process and return the room id.

On the first line of the `Create_Room()` function you will see we begin by generating our management token. This
is a seperate function called `Get_Management_Token()`. My Go code for `Get_Management_Token()` is essentially the same
as the recommended Go code written in the 100ms
[docs](https://www.100ms.live/docs/get-started/v2/get-started/security-and-tokens#management-token-for-rest-api).

# `Create_Room()`
Creates a 100ms room and returns it's id or an error if one occured.

**Example:**
```go
id, err = Create_Room()
if err == nil {
	fmt.Println(id) // Prints the room id e.g. 631b2654f771854d9bf633df
}
```

_Arguements:_
- None.

### Returning host and guest codes
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
