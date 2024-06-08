import React, { useEffect } from 'react'

import { useState } from "react";
import { apiGetProfile, apiSetBmi } from "../api/auth";
import Header from '../components/layouts/Header';

export default function Bmi() {
    const [data, setData] = useState<{
        tall: number;
        weight: number;
        plan : number
      }>({
        tall: 0,
        weight: 0,
        plan: 0,
      });

      useEffect(() => {
        const getProfile = async () => {
            const profile = await apiGetProfile()
            setData({
                tall: profile.tall,
                weight: profile.weight,
                plan: profile.plan,
              });
            
        }
        getProfile()
      },[])
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setData((prevData) => ({
          ...prevData,
          [name]: parseFloat(value)
        }));
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const profile: any = await apiSetBmi(data)
        setData({
            tall: profile.tall,
            weight: profile.weight,
            plan: profile.plan,
          });
      };
  return (
    <div>
        <Header menu=''/>
        <div className=" w-full flex justify-center items-center mt-20">
            <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-3/12 flex flex-col gap-6">
              <p className="text-5xl tracking-widest">BMI Status</p>
              
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
           
                <div>
                  <p>Body Tall</p>
                  <input
                    type="number"
                    className="py-3 px-4 w-full rounded-md border border-custom-color"
                    onChange={handleChange}
                    name="tall"
                    value={data.tall}
                  />
                </div>
                <div>
                  <p>Body Weight</p>
                  <input
                    type="number"
                    className="py-3 px-4 w-full rounded-md border border-custom-color"
                    onChange={handleChange}
                    name="weight"
                    value={data.weight}
                  />
                </div>
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
                        checked={data.plan === 1}
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
                        checked={data.plan === 2}
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
                        checked={data.plan === 3}
                      />
                      <label htmlFor="3" className="text-lg font-semibold">{"5kg (1.3 months)"}</label>
                    </div>
                  </div>
                </div>
                <button
                type='submit'
                  className="w-full bg-custom-color text-white py-3 rounded-md"
                >
                  <p className="text-center">Update BMI</p>
                </button>
              </form>
            </div>
          </div>
    </div>
  )
}
