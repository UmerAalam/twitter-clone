import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import type { SignIn } from "../../../server/src/modules/auth/auth.dto";
import { client } from "../lib/client";
import { useNavigate } from "react-router-dom";
const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (user: SignIn) => {
      const res = await client.api.auth["sign-in"].$post({ json: user });
      if (!res.ok) {
        console.error(await res.json());
        throw new Error("Response Error");
      }
      return res.json();
    },
    onSuccess: (data) => {
      if ("token" in data) {
        localStorage.setItem("token", data.token);
      }
      navigate("/");
    },
    onError: (error) => {
      return { message: error.message };
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newUser: SignIn = {
      email,
      password,
    };
    mutate(newUser);
  };
  return (
    <div className="flex bg-white h-screen justify-center p-1">
      <div className="rounded-2xl bg-white py-8 my-auto white shadow-gray-200 inset-shadow-2xs shadow-lg h-[520px] w-[400px] font-black">
        <h2 className="flex justify-center text-gray-700 text-4xl mt-7">
          Sign in
        </h2>
        <form>
          <input
            title="Email"
            className="mt-5 focus:outline-blue-400 flex justify-center w-[80%] h-12 mx-auto font-medium border border-gray-300 rounded-md p-2"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative w-[80%] mx-auto mt-5">
            <input
              title="Password"
              className="w-full h-12 font-medium border border-gray-300 rounded-md p-2 pr-10 focus:outline-blue-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={toggle ? "password" : "text"}
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>
          <button
            onClick={handleSubmit}
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
