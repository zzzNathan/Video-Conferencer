# Definitions
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
