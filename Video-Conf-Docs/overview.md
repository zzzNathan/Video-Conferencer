# Overview

## What is Video-Conferencer?
Video-Conferencer is a web application that allows users to create and join video conferences
with others.

I created this project as part of my A-Level Computer Science NEA (Non-exam assessment)
component for the 2024-25 OCR summer exam series. The premise was essentially to make a
**simpler** version of Zoom, to allow it to be more accessible to those with minimal experience
with technology.

This documentation is written to explain the details behind how the system *actually* works,
for future maintainers and/or for all those who are interested.

> [!NOTE]
> This documentation is intended to be *entirely* self-contained. That means you should be able
> fully understand how this system works, by reading the documentation alone.
>
> If something is
> missing or explained poorly please don't hesistate to submit a pull request or an issue on
> [Github](https://github.com/zzzNathan/Video-Conferencer).

## Key Concepts
Here we explain some fundamental concepts in web app development,

**Front-end:** The actual page design that the end user will see and interact with. In Video-Conferencer we use the
React library to create our front-end UI.

**Back-end:** This is program code that will run on servers and **not** on the client's device. It is typically used to
run code that must be hidden from the user for security reasons like accessing a database or generating authentication
keys. In Video-Conferencer we use the Go programming language for our back-end code.

**API:** An API (Application programming interface) describes the way in which the front-end of our application
interacts with the back-end. This interaction is typically done using the HTTP protocol.

### An example

Let's run through a simple example to understand those concepts. Suppose we have a library system application, where
users can log in and see the books they have borrowed. We store user log in data in our database on a server.

When a user wants to log in they enter a username and password in the required fields in our front-end. Then when the
user presses the submit button our front-end makes a HTTP [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
request to our back-end,

```js
fetch('https://api.example.com/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    Username: 'WWarren',
    Password: 'goood123'
  })
})
```

Then in our back-end we have some code to check whether or not this username and password is correct, and if it is
we return some JSON like so,

```json
{
  "User_Exists": "true",
  "Correct_Password": "true"
}
```

> [!NOTE]
> The reason we do the username and password checks on the back-end is to to prevent malicious users from accessing
> our database directly or discovering how passwords are stored. If we performed these checks on the front-end,
> anyone could inspect the code and potentially compromise our security.
