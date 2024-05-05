// import { jwtDecode } from "jwt-decode";
// import Cookies from "universal-cookie";
// import React, { useEffect, useState } from "react";
// import { fireAlert } from "../utility";
// import { User } from '../App'

import { useState } from "react";
import Cookies from 'universal-cookie'

export default function Signin(
  // setUser
  // logOrSign: boolean,
   {callback}: any 
) {

  const[logOrSign, setLogOrSign] = useState(true)
  // False will be a log in, true will be a sign up

  // const setCookie = () => {

  // }

  function createCookie( event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cookie = new Cookies()
    
    const form = event.currentTarget
    const data = new FormData(form)
    const user = {
      email: data.get('email') as string,
      password: data.get('password') as string
    }

    cookie.set('user_token', {user}, {path: '/'})
    callback(true)

    form.reset()
  }



  

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

  // const handleClick = () => {
  //   callback(true);
  // }

  


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{textContent().Title}</h2>
        <form onSubmit={createCookie}>
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
  
