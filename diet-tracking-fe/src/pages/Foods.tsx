import React, { useEffect, useState } from "react";
import DynamicLayout from "../components/layouts/DynamicLayout";
import Header from "../components/layouts/Header";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import FoodCard from "../components/cards/FoodCard";
import { apiFood } from "../api/food";
import { Link } from "react-router-dom";

interface foods{
  food_name: string,
  description: string,
  calories: number
}

export default function Foods() {
  const [datas,setDatas] = useState<foods[]>([])
  useEffect(() => {
    const getData = async () => {
      const data = await apiFood()
      console.log(data);
      setDatas(data)
    }
    getData()
  }, [])


  return (
    <div>
      <div>
        <Header menu="Food" />
        <DynamicLayout border={false}>
          <div className="mt-12">
            <div className="w-full py-2 px-4 border border-blue-500 rounded-xl flex gap-3 items-center">
              <FaSearch />
              <input
                type="search"
                name=""
                id=""
                className="outline-none grow flex"
                placeholder="Search"
              />
            </div>
            <div className="mt-6">
              <div className="flex justify-between">
                <p className="text-2xl font-semibold ">My Foods</p>
                <Link to={"/createfood"} className="bg-blue-500 rounded-xl px-4 py-2 text-white flex items-center gap-3" >

                  <FaPlus/>
                  Create Food
                </Link>
              </div>
              <div>
              {datas.length > 0 ? (
                  datas.map((data) => (
                    <FoodCard
                    food_name={data.food_name}
                      description={data.description}
                      calories={data.calories}
                    />
                  ))
                ) : (
                  <p>No foods available</p>
                )}
            
              </div>
            </div>
          </div>
        </DynamicLayout>
      </div>
    </div>
  );
}
