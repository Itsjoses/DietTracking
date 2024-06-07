import { PiHandWaving } from "react-icons/pi";
import DynamicLayout from "../components/layouts/DynamicLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Register() {
  const [data, setData] = useState<{  username: string,email: string; password: string }>({
    username:"",
    email: "",
    password: "",
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen max-w-screen">
      <DynamicLayout border={true}>
        <div className="flex justify-between py-6 mb-2">
          <div className="font-Merienda text-2xl text-custom-color font-bold">
            Diet Tracking
          </div>
        </div>
      </DynamicLayout>
      <div className=" w-full flex justify-center items-center mt-20">
        <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-3/12 flex flex-col gap-6">
          <p className="text-5xl tracking-widest">Register</p>
          <p className="flex items-center gap-2">
            <span className="text-custom-color">Hi,</span> Welcome back <PiHandWaving />
          </p>
          <form className="flex flex-col gap-6" >
          <div>
              <p>Username</p>
              <input
                type="text"
                className="py-3 px-4 w-full rounded-md border border-custom-color"
                placeholder="E.g. Josesusanto@gmail.com"
                onChange={handleChange}
                name="username"
              />
            </div>
            <div>
              <p>Email</p>
              <input
                type="email"
                className="py-3 px-4 w-full rounded-md border border-custom-color"
                placeholder="E.g. Josesusanto@gmail.com"
                onChange={handleChange}
                name="email"
              />
            </div>
            <div>
              <p>Password</p>
              <input
                type="password"
                className="py-3 px-4 w-full rounded-md border border-custom-color"
                placeholder="Enter your password"
                onChange={handleChange}
                name="password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-custom-color text-white py-3 rounded-md"
            >
              Login
            </button>
          </form>
          <div className="flex gap-1 justify-center">
              Already have an account? <Link to={"/login"} className="text-custom-color">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
