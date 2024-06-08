import { PiHandWaving } from "react-icons/pi";
import DynamicLayout from "../components/layouts/DynamicLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../contexts/AuthContext";
import { setToken } from "../libs/auth";
import Middleware from "../libs/middleware";
import { apiLogin } from "../api/auth";
export default function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [error, setError] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const responseData: any = await apiLogin(data)
      setUser(responseData.data.username);
      setToken(responseData.data, navigate);
    } catch (error) {
      setError("invalid Email and Password")
    }

  };

  return (
    <Middleware.Guest>

    <div className="h-screen max-w-screen">
      <DynamicLayout border={true}>
        <div className="flex justify-between py-6 mb-2">
          <Link to={"/"} className="font-Merienda text-2xl text-custom-color font-bold">
            Diet Tracking
          </Link>
        </div>
      </DynamicLayout>
      <div className=" w-full flex justify-center items-center mt-20">
        <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-3/12 flex flex-col gap-6">
          <p className="text-5xl tracking-widest">Login</p>
          <p className="flex items-center gap-2">
            <span className="text-custom-color">Hi,</span> Welcome back{" "}
            <PiHandWaving />
          </p>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <p>Email</p>
              <input
                type="text"
                className="py-3 px-4 w-full rounded-md border border-custom-color"
                placeholder="E.g. windah@gmail.com"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Password</p>
              <input
                type="password"
                className="py-3 px-4 w-full rounded-md border border-custom-color"
                placeholder="Enter your password"
                name="password"
                onChange={handleChange}
              />
            </div>
            {(error !== "") ? (
              
              <p className="text-red-500 text-center">{error}</p>
               ) : <></>
            }
            <button
              type="submit"
              className="w-full bg-custom-color text-white py-3 rounded-md"
            >
              Login
            </button>
          </form>
          <div className="flex gap-1 justify-center">
            Not registered yet?{" "}
            <Link to={"/register"} className="text-custom-color">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
    </Middleware.Guest>

  );
}
