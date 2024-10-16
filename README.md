# Anonymous Feedback

Anonymous Feedback is a web application where users can receive feedback from others anonymously. The app ensures privacy for feedback providers while giving users the ability to authenticate and secure their accounts through email verification. It is built with modern tools and a clean UI for seamless user experience.

## Features

- Anonymous Feedback: Users can share a unique link to receive anonymous feedback from anyone.
- User Authentication: Secure login and authentication using NextAuth.js.
- Email Verification: Users are required to verify their email by entering a code sent to their email address.
- Beautiful UI: The app uses shadcn/ui components for a polished interface.

## Tech Stack

- Frontend: React, Next.js
- Authentication: NextAuth.js
- Email Service: Resend
- UI Library: shadcn/ui
- Backend: API routes in Next.js
- Database: MongoDB Atlas

## Installation

1.  Clone the repository:

```
git clone https://github.com/harry713j/anonymous-feedback
```

2. Navigate into the project directory:

```
cd anonymous-feedback
```

3. Install the dependencies:

```
npm install
```

4. Set up the environment variables:

Create a `.env` file in the root of the project and add the following variables:

```
MONGODB_URI = "Your mongodb connection string"
RESEND_API_KEY = "Your resend Api key"
NEXTAUTH_SECRET= "Any secrete value"
```

5. Run the development server:

```
npm run dev
```

Open http://localhost:3000 in your browser.

## Usage

- Sign Up: Create an account using your email.
- Verify Email: After signing up, you will receive a verification code. Enter it to verify your email address.
- Receive Feedback: Share your unique profile link with others to start receiving anonymous feedback.
- View Feedback: Feedback is displayed in your dashboard, and you can respond to it if you choose.

## Contributions

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to customize this further to fit your project's specific details! ❤️😊
