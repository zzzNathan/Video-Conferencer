# Creating a room
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
