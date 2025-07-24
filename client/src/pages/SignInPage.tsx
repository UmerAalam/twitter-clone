import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FcGoogle } from "react-icons/fc";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import type { SignIn } from "../../../server/src/modules/auth/auth.dto";
import { client } from "../lib/client";
import { useNavigate } from "@tanstack/react-router";
const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (user: SignIn) => {
      const res = await client.api.auth["sign-in"].$post({ json: user });
      if (!res.ok) {
        throw new Error("Response Error");
      }
      return res.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id.toString());
      navigate({ to: "/" });
    },
    onError: (error) => {
      return { message: error.message };
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const findUser: SignIn = {
      email,
      password,
    };
    mutate(findUser);
  };
  return (
    <div className="flex bg-white h-screen justify-center p-1 dark:bg-gray-700">
      <div className="rounded-2xl bg-white py-8 my-auto white shadow-gray-200 dark:bg-gray-800 dark:shadow-gray-600/50 inset-shadow-2xs shadow-lg h-[520px] w-[400px] font-black">
        <h2 className="flex justify-center text-gray-700 dark:text-white text-4xl mt-7">
          Sign in
        </h2>
        <form onSubmit={handleSubmit} id="sign-in">
          <div className="w-[80%] mx-auto">
            <label className="text-gray-800 dark:text-white font-semibold">
              Email
            </label>
            <input
              title="Email"
              className="p-3 bg-gray-100 dark:bg-gray-700 dark:text-white w-full h-12 font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative w-[80%] mx-auto mt-5">
            <label className="text-gray-800 dark:text-white font-semibold items-center">
              Password
              <div className="relative">
                <input
                  title="Password"
                  className="w-full p-3 h-12 bg-gray-100 font-medium border dark:bg-gray-700 dark:text-white border-gray-300 rounded-md pr-10 focus:outline-blue-400"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={toggle ? "password" : "text"}
                  minLength={8}
                  required
                />
                <span
                  className="absolute right-3 top-0 h-12 flex items-center cursor-pointer"
                  onClick={() => setToggle(!toggle)}
                >
                  {toggle ? (
                    <IoEye className="dark:text-white" />
                  ) : (
                    <IoEyeOff className="dark:text-white" />
                  )}
                </span>
              </div>
            </label>
          </div>
          <button
            type="submit"
            className="cursor-pointer hover:bg-blue-300 text-white rounded-md flex items-center justify-center mx-auto mt-7 bg-blue-400 text-xl h-12 w-[80%]"
          >
            Sign in
          </button>
          <div className="flex justify-center mt-2 font-medium text-gray-400">
            Don't have account?
            <Link to="/sign-up" className="cursor-pointer ml-1 text-blue-400">
              Sign up
            </Link>
          </div>
        </form>
        <div className="flex justify-between items-center mx-9 mt-5">
          <hr className="w-[40%] dark:text-gray-700" />
          <div className="font-medium text-gray-400 -m-1.5">or</div>
          <hr className="w-[40%] dark:text-gray-700" />
        </div>
        <button
          type="submit"
          className="hover:bg-gray-50 dark:hover:bg-gray-700  dark:text-white outline-2 outline-gray-700 cursor-pointer text-gray-700 rounded-md flex items-center justify-center mx-auto mt-7 bg-white-400 text-xl h-12 w-[80%]"
        >
          <FcGoogle className="mr-2" size={24} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
