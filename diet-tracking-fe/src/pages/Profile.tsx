import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/layouts/Header";
import { apiGetProfile, apiSetProfile } from "../api/auth";
export default function Profile() {
    const navigate = useNavigate();
  const [data, setData] = useState<{ username: string; email: string, dob: string,gender: string }>({
    username: "",
    email: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    const getProfile = async () => {
        const profile = await apiGetProfile()
        setData({
            username: profile.username,
            email: profile.email,
            dob: profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : '',
            gender: profile.gender,
          });
        
    }
    getProfile()
  },[])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    e.preventDefault()
    setData((prevData) => ({
        ...prevData,
        [name]: name === "calories" ? parseFloat(value)
            : value,
      }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profile: any = await apiSetProfile({username: data.username,email:data.email,dob:data.dob})
    setData({
        username: profile.username,
        email: profile.email,
        dob: profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : '',
        gender: profile.gender,
      });
  };

  return (
    <div className="h-screen max-w-screen">
        <Header menu=""/>
      <div className=" w-full flex justify-center items-center pt-20">
        <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-3/12 flex flex-col gap-6">
          <p className="text-5xl tracking-widest mb-8">Profile</p>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <p>Username</p>
              <input
                type="text"
                className="py-3 px-4 w-full rounded-md border border-custom-color"
                name="username"
                value={data?.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Email</p>
              <input
                type="text"
                className="py-3 px-4 w-full rounded-md border border-custom-color"
                name="email"
                value={data?.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Date Of Birth</p>
              <input
                type="date"
                className="py-3 px-4 w-full rounded-md border border-custom-color"
                name="dob"
                value={data?.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Gender</p>
              <input
                type="text"
                className="py-3 px-4 w-full rounded-md border border-custom-color"
                name="gender"
                value={data?.gender}
                onChange={handleChange}
                readOnly
              />
            </div>
            <button
              type="submit"
              className="w-full bg-custom-color text-white py-3 rounded-md mt-5"
            >
              Update Profile
            </button>
          </form>
          
        </div>
      </div>
    </div>

  );
}
