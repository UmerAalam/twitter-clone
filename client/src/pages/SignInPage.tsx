import React from "react";
import { FcGoogle } from "react-icons/fc";
const SignInPage = () => {
  return (
    <div className="flex bg-white h-screen justify-center p-1">
      <div className="rounded-2xl bg-white my-auto white shadow-gray-200 inset-shadow-2xs shadow-lg h-[520px] w-[400px] font-black">
        <h2 className="flex justify-center text-gray-700 text-4xl mt-7">
          Sign in
        </h2>
        <form>
          <input
            title="Name"
            className="mt-5 focus:outline-blue-400 flex justify-center w-[80%] h-12 mx-auto font-medium border border-gray-300 rounded-md p-2"
            placeholder="Name"
            type="text"
            required
          />
          <input
            title="Email"
            className="mt-5 focus:outline-blue-400 flex justify-center w-[80%] h-12 mx-auto font-medium border border-gray-300 rounded-md p-2"
            placeholder="Email"
            type="email"
            required
          />
          <input
            title="Password"
            className="mt-5 focus:outline-blue-400 flex justify-center w-[80%] h-12 mx-auto font-medium border border-gray-300 rounded-md p-2"
            placeholder="Password"
            type="password"
            required
          />
          <button
            type="submit"
            className="cursor-pointer hover:bg-blue-300 text-white rounded-md flex items-center justify-center mx-auto mt-7 bg-blue-400 text-xl h-12 w-[80%]"
          >
            Sign in
          </button>
          <div className="flex justify-center mt-2 font-medium text-gray-400">
            Don't have account?
            <a className="cursor-pointer ml-1 text-blue-400">Sign up</a>
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
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
