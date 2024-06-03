import { useState } from "react";

export default function Signin({ callback }: any) {
  const [logOrSign, setLogOrSign] = useState(true);

  function authUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const user = {
      //este usuario se lo mandariamos por post :(
      email: data.get("email") as string,
      password: data.get("password") as string,
    };

    callback(true);

    form.reset();
  }

  const textContent = () => {
    if (logOrSign) {
      return {
        Title: "Sign In",
        Button: "Sign In",
        Footer: "you don't have a user?",
        Link: "Register",
      };
    } else {
      return {
        Title: "Register",
        Button: "Register",
        Footer: "Already have an account?",
        Link: "Sign In",
      };
    }
  };

  return (
    <div className="bg-red-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6">{textContent().Title}</h2>
        <form onSubmit={authUser}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring focus:ring-red-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring focus:ring-red-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600"
          >
            {textContent().Button}
          </button>
        </form>
        <p className="mt-6 text-center text-lg">
          {textContent().Footer}{" "}
          <a
            href="#"
            className="text-red-500 font-semibold"
            onClick={() => {
              setLogOrSign(!logOrSign);
            }}
          >
            {textContent().Link}
          </a>
        </p>
      </div>
    </div>
  );
}
