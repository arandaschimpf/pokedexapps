// import { jwtDecode } from "jwt-decode";
// import Cookies from "universal-cookie";
// import React, { useEffect, useState } from "react";
// import { fireAlert } from "../utility";
// import { User } from '../App'

import { useState } from "react";

export default function Signin(
  // setUser
  // logOrSign: boolean,
   callback 
) {

  const[logOrSign, setLogOrSign] = useState(true)
  // False will be a log in, true will be a sign up

  

  const textContent = () => {
    if(logOrSign) {
      return({
        Title: 'Sign In',
        Button: 'Sign In',
        Footer: 'Not Registered Yet?',
        Link: 'Register Here!'
      })
    } else {
      return({
        Title: 'Register',
        Button: 'Register',
        Footer:  "Already registerd?",
        Link: 'Sign In Here!'
      })
    }
  }

  const handleClick = () => {
    callback();
  }

  


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{textContent().Title}</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleClick}
          >
            {textContent().Button}
          </button>
        </form>
        <p className="mt-4 text-center">
          {textContent().Footer}{" "}
          <a href="#" className="text-blue-500 font-semibold" onClick={() => {setLogOrSign(!logOrSign)}}>
            {textContent().Link}

          </a>
        </p>
      </div>
    </div>
  );
  }
  

//   setUser,
//   textContents,
//   mode,
//   changeMode,
//   url,
// }) {
//   // Initialize the cookies manager
//   const cookies = new Cookies();

//   const [error, setError] = useState<string>(null);

//   useEffect(() => {
//     if (error) fireAlert(error, "error");
//   }, [error]);

//   const login = async (data) => {
//     // Decode the jwt
//     const decodedJwt = jwtDecode(data.access_token);
//     // Updates the user state
//     setUser((decodedJwt as { email: string }).email);
//     // Set cookie and converts the expiration time from the jwt (in milliseconds) to seconds
//     cookies.set("jwt_authorization", data.access_token, {
//       expires: new Date(decodedJwt.exp * 1000),
//     });
//     // Set the email that we got from the endpoint as the current user
//     setUser(data.email);
//     fireAlert(`Logged as ${data.user}`);
//   };

//   const register = (data) => {
//     if (data.email) {
//       fireAlert(`Registered as ${data.email}`);
//       changeMode();
//       // setAlert({ type: "accepted", text: "Registered successfully" });
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // I pretended that this is not react...
//     const form = event.currentTarget;
//     // Get the information of the form
//     const data = new FormData(form);
//     // Check that the form's inputs have values. The reason of this try and catch blocks is to cut the outer function execution if the validation throw's an error (some or both of the input's values is empty)
//     try {
//       data.forEach((value) => {
//         if (value === "") {
//           // If not shows an error...
//           setError("Both fields are required");
//           // ...and cuts the execution
//           throw new Error();
//         }
//       });
//     } catch {
//       // If some of the fields were empty, stops the execution of handleSubmit
//       return;
//     }
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({
//         email: data.get("email"),
//         password: data.get("pass"),
//       }),
//     });
//     // Validate the response from the server
//     if (response.ok) {
//       const data = await response.json();
//       if (mode) {
//         login(data);
//       } else {
//         register(data);
//       }
//     } else if (response.status == 403) {
//       setError(textContents.error);
//     }
//     if (response.status == 400) {
//       // If the server response's status was "Bad request", it's because the the email was malformed, so show an error
//       setError("Invalid email format");
//     }
//   };


