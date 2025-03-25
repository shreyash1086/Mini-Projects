In this section, I am learning and revising authentication.

Authentication is the process of letting the user `sign in` and `sign out` of your website.

Authentication Flow

- The user comes to your website.

- The user sends a request to `/signin` with their `username` and `password`.

- The user gets back a `token`.

- In every subsequent request, the user sends the `token` to identify themselves to the backend.

### Complete Process

- Firstly, I have created an Express.js backend application using the Express library. The Express library is used to handle request routes efficiently by utilizing middleware.

- Secondly, I added another important library, `jsonwebtoken (JWT)`. JWT is a stateless way to generate tokens and authenticate users based on the token only, by using the `sign()` method to generate a token and the `verify()` method to verify the encoded username with the help of a SECRET key.

- Initially, while learning the basic backend application, I created an `in-memory variable` to store user information like usernames and passwords of new users who sign up for the application by hitting the `/signup` handler.

- Once the user successfully signs up, they will sign in with the same credentials. If the user provides valid information, they will be signed in and also provided with a `JWT token`, which is stored in the user's browser memory, called `LocalStorage`.

- So, whenever the user makes future requests, they don't have to send their credentials again and again. They can simply send the token stored in the browser to `authenticate` themselves.

- After the user successfully signs in, the backend receives the token stored in `LocalStorage`, verifies it, and checks whether the user is present in the `in-memory variable`.

- If the user is found, the backend returns the `username` and `password` back to them.

### Here is a Snap shot


![Screenshot 2025-03-25 220306](https://github.com/user-attachments/assets/f7b2d80d-4757-4c32-aaa2-1b8059859350)


Thank you for reading
