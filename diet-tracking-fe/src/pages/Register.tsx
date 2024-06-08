import { PiHandWaving } from "react-icons/pi";
import DynamicLayout from "../components/layouts/DynamicLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRegister } from "../api/auth";
import { useUser } from "../contexts/AuthContext";
import { setToken } from "../libs/auth";
export default function Register() {
  const [data, setData] = useState<{
    username: string;
    email: string;
    password: string;
    dob: string;
    tall: number;
    weight: number;
    gender: string;
    plan : number
  }>({
    username: "",
    email: "",
    password: "",
    dob: "",
    tall: 0,
    weight: 0,
    plan: 0,
    gender: "",
  });

  const [pages, setPages] = useState<number>(0);
  const {setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]:
        name === "dob"
          ? new Date(value).toISOString() // Convert date to ISO string
          : name === "tall" || name === "weight" || name === 'plan'
          ? parseFloat(value)
          : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const responseData: any = await apiRegister(data)
    
    setUser(responseData.data.username);
    setToken(responseData.data, navigate);
  };

  return (
    <div className="h-screen max-w-screen">
      <DynamicLayout border={true}>
        <div className="flex justify-between py-6 mb-2">
          <Link to={"/"} className="font-Merienda text-2xl text-custom-color font-bold">
            Diet Tracking
          </Link>
        </div>
      </DynamicLayout>
      {pages === 0 ? (
        <div className=" w-full flex justify-center items-center mt-20">
          <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-3/12 flex flex-col gap-6">
            <p className="text-5xl tracking-widest">Register</p>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2 ">
                <span className="text-custom-color ">Hi,</span> Welcome back{" "}
                <PiHandWaving />
              </div>
              <p>1/3</p>
            </div>
            <form className="flex flex-col gap-6">
              <div>
                <p>Username</p>
                <input
                  type="text"
                  className="py-3 px-4 w-full rounded-md border border-custom-color"
                  placeholder="E.g. windah@gmail.com"
                  onChange={handleChange}
                  name="username"
                />
              </div>
              <div>
                <p>Email</p>
                <input
                  type="email"
                  className="py-3 px-4 w-full rounded-md border border-custom-color"
                  placeholder="E.g. windah@gmail.com"
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
              {(error !== "" )? (
                <p className="text-red-500 text-center">{error}</p>
              ): <></>}
              <div
                className="w-full bg-custom-color text-white py-3 rounded-md"
                onClick={(e: any) => {
                  e.preventDefault();
                  if (!data.username || !data.email || !data.password) {
                    setError("All fields must be filled");
                    return;
                  }else{
                    setError("")
                  }
                  setPages(1);
                }}
              >
                <p className="text-center">Next</p>
              </div>
            </form>
            <div className="flex gap-1 justify-center">
              Already have an account?{" "}
              <Link to={"/login"} className="text-custom-color">
                Login
              </Link>
            </div>
          </div>
        </div>
      ) : pages === 1 ? (
        <>
          <div className=" w-full flex justify-center items-center mt-20">
            <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-3/12 flex flex-col gap-6">
              <p className="text-5xl tracking-widest">Register</p>
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2 ">
                  <span className="text-custom-color ">Hi,</span> Welcome back{" "}
                  <PiHandWaving />
                </div>
                <p>2/3</p>
              </div>
              <form className="flex flex-col gap-6">
                <div>
                  <p>Date of Birth</p>
                  <input
                    type="date"
                    className="py-3 px-4 w-full rounded-md border border-custom-color"
                    onChange={handleChange}
                    name="dob"
                  />
                </div>
                <div>
                  <p>Body Tall</p>
                  <input
                    type="number"
                    className="py-3 px-4 w-full rounded-md border border-custom-color"
                    placeholder="Enter your height in cm"
                    onChange={handleChange}
                    name="tall"
                  />
                </div>
                <div>
                  <p>Body Weight</p>
                  <input
                    type="number"
                    className="py-3 px-4 w-full rounded-md border border-custom-color"
                    placeholder="Enter your Weight in KG"
                    onChange={handleChange}
                    name="weight"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p>Gender</p>
                  <div className="flex gap-4">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      onChange={handleChange}
                    />
                    <label htmlFor="male">Male</label>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      onChange={handleChange}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
                <div
                  className="w-full bg-custom-color text-white py-3 rounded-md"
                  onClick={() => {
                    setPages(2);
                  }}
                >
                  <p className="text-center">Next</p>
                </div>
              </form>
              <div className="flex gap-1 justify-center">
                Already have an account?{" "}
                <Link to={"/login"} className="text-custom-color">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" w-full flex justify-center items-center mt-20">
            <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-3/12 flex flex-col gap-6">
              <p className="text-5xl tracking-widest">Register</p>
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2 ">
                  <span className="text-custom-color ">Hi,</span> Welcome back{" "}
                  <PiHandWaving />
                </div>
                <p>3/3</p>
              </div>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <p>Choose Your Plan !</p>
                  <div className="flex gap-4 flex-col ">
                    <div className="flex gap-4">
                      <input
                        type="radio"
                        id="male"
                        name="plan"
                        value="1"
                        onChange={handleChange}
                      />
                      <label htmlFor="1" className="text-lg font-semibold">{"20kg (5 months)"}</label>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="radio"
                        id="female"
                        name="plan"
                        value="2"
                        onChange={handleChange}
                      />
                      <label htmlFor="2" className="text-lg font-semibold">{"10kg (3 months)"}</label>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="radio"
                        id="female"
                        name="plan"
                        value="3"
                        onChange={handleChange}
                      />
                      <label htmlFor="3" className="text-lg font-semibold">{"5kg (1.3 months)"}</label>
                    </div>
                  </div>
                </div>
                <button
                type="submit"
                  className="w-full bg-custom-color text-white py-3 rounded-md"
                >
                  <p className="">Register</p>
                </button>
              </form>
              <div className="flex gap-1 justify-center">
                Already have an account?{" "}
                <Link to={"/login"} className="text-custom-color">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
