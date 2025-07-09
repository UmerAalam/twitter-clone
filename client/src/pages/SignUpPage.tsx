import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import type { SignUpUser } from "../store/interfaces";
import { nanoid } from "@reduxjs/toolkit";
const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSumbitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const newUser: SignUpUser = {
      id: nanoid(),
      firstName,
      lastName,
      email,
      password,
    };
    console.log(newUser);
  };
  return (
    <div className="flex bg-white h-screen justify-center p-1">
      <div className="rounded-2xl bg-white my-auto white shadow-gray-200 inset-shadow-2xs shadow-lg h-[520px] w-[400px] font-black">
        <h2 className="flex justify-center text-gray-700 text-4xl mt-7">
          Sign up
        </h2>
        <form onSubmit={handleSumbitForm}>
          <span className="flex flex-row gap-5 justify-center">
            <input
              title="First Name"
              className="mt-5 focus:outline-blue-400 flex justify-center w-[150px] h-12 font-medium border border-gray-300 rounded-md p-2"
              placeholder="Fist Name"
              type="text"
              maxLength={10}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              title="Last Name"
              className="mt-5 focus:outline-blue-400 flex justify-center w-[150px] h-12 font-medium border border-gray-300 rounded-md p-2"
              placeholder="Last Name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              maxLength={10}
              required
            />
          </span>
          <input
            title="Email"
            className="mt-5 focus:outline-blue-400 flex justify-center w-[80%] h-12 mx-auto font-medium border border-gray-300 rounded-md p-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            title="Password"
            className="mt-5 focus:outline-blue-400 flex justify-center w-[80%] h-12 mx-auto font-medium border border-gray-300 rounded-md p-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <button
            type="submit"
            className="cursor-pointer hover:bg-blue-300 text-white rounded-md flex items-center justify-center mx-auto mt-7 bg-blue-400 text-xl h-12 w-[80%]"
          >
            Sign Up
          </button>
          <div className="flex justify-center mt-2 font-medium text-gray-400">
            Already have an account?
            <a className="cursor-pointer ml-1 text-blue-400">Login</a>
          </div>
        </form>
        <div className="flex justify-between mx-9 mt-5">
          <hr className="w-[40%]" />
          <div className="font-medium text-gray-400 -m-1.5">or</div>
          <hr className="w-[40%]" />
        </div>
        <button
          type="submit"
          className="hover:bg-gray-50 outline-2 outline-gray-700 cursor-pointer text-gray-700 rounded-md flex items-center justify-center mx-auto mt-7 bg-white-400 text-xl h-12 w-[80%]"
        >
          <FcGoogle className="mr-2" size={24} />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
