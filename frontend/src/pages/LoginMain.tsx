'use client'
import RightDropdown from "@/components/RightDropdown";
import bgmain from '../assets/images/bgmain.png'
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";

const LoginMain = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log({ userId, password });
  }

  return (
    <div className="flex flex-col relative text-white min-h-screen">
      <div className="">
        <RightDropdown />
      </div>

      <div className="flex justify-center text-customLightBlue font-bold text-4xl mt-12 p-2">
        <h1>Login using ID / Password</h1>
      </div>

      <section className="border border-customLightBlue bg-customBlue m-12 p-8 text-xl text-center rounded-md shadow-lg z-30">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="flex items-center justify-center space-x-14">
            <label htmlFor="userId" className="w-32 text-right text-lg font-medium">
              User ID:
            </label>
            <input
              id="userId"
              type="text"
              placeholder="Enter User Id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="bg-transparent border-2 border-customLightBlue rounded-md p-2 w-64"
            />
          </div>

          <div className="flex items-center justify-center space-x-14">
            <label htmlFor="password" className="w-32 text-right text-lg font-medium">
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-2 border-customLightBlue rounded-md p-2 w-64"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" className="bg-orange-600 hover:bg-orange-400">
              Save and Continue
            </Button>
          </div>
        </form>
      </section>
      <img src={bgmain} alt="" className="absolute bottom-0 left-1/4"/>
    </div>
  );
};

export default LoginMain;
