import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "@tanstack/react-router";
import { SignUp } from "../../../server/src/modules/auth/auth.dto.ts";
import { useMutation } from "@tanstack/react-query";
import { client } from "../lib/client.ts";
import { useNavigate } from "@tanstack/react-router";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (user: SignUp) => {
      const res = await client.api.auth["sign-up"].$post({ json: user });
      if (!res.ok) {
        throw new Error("Unable to sign-up");
      }
      return res.json();
    },
    onSuccess: () => {
      navigate({ to: "/sign-in" });
    },
  });
  const handleSumbitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password == confirmPassword) {
      const newUser: SignUp = {
        name,
        avatar:
          "https://i.ibb.co/LBcb2Bt/formula-physics-worksheet-illustration-wallpaper.jpg",
        password,
        email,
      };
      mutate(newUser);
    }
  };
  return (
    <div className="flex bg-white dark:bg-gray-700 h-screen justify-center p-1">
      <div className="rounded-2xl bg-white dark:bg-gray-800 dark:shadow-gray-600/50 shadow-gray-200 my-auto inset-shadow-2xs shadow-lg h-[600px] w-[400px] font-black">
        <h2 className="flex justify-center text-gray-700 dark:text-white text-4xl my-7">
          Sign up
        </h2>
        <form onSubmit={handleSumbitForm}>
          <input
            title="Full Name"
            className="mx-auto dark:text-white focus:outline-blue-400 flex justify-center w-[80%] h-12 font-medium border border-gray-300 rounded-md p-3"
            placeholder="Full Name"
            type="text"
            maxLength={10}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            title="Email"
            className="mt-5 focus:outline-blue-400 dark:text-white flex justify-center w-[80%] h-12 mx-auto font-medium border border-gray-300 rounded-md p-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            title="Password"
            className="mt-5 focus:outline-blue-400 flex dark:text-white justify-center w-[80%] h-12 mx-auto font-medium border border-gray-300 rounded-md p-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <input
            title="Confirm-Password"
            className="mt-5 focus:outline-blue-400 flex justify-center dark:text-white w-[80%] h-12 mx-auto font-medium border border-gray-300 rounded-md p-3"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            <Link to="/sign-in" className="cursor-pointer ml-1 text-blue-400">
              Login
            </Link>
          </div>
        </form>
        <div className="flex justify-between items-center mx-9 mt-5">
          <hr className="w-[40%] dark:text-gray-600" />
          <div className="font-medium text-gray-400 -m-1.5">or</div>
          <hr className="w-[40%] dark:text-gray-600" />
        </div>
        <button
          type="submit"
          className="hover:bg-gray-50 outline-2 outline-gray-700 dark:text-white dark:hover:bg-gray-700 cursor-pointer text-gray-700 rounded-md flex items-center justify-center mx-auto mt-7 bg-white-400 text-xl h-12 w-[80%]"
        >
          <FcGoogle className="mr-2" size={24} />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
