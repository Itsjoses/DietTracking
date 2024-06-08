import React, { useEffect, useState } from "react";
import Header from "../components/layouts/Header";
import DynamicLayout from "../components/layouts/DynamicLayout";
import { FaSearch } from "react-icons/fa";
import { apiViewHistoryDiet } from "../api/food";

interface Data{
  food_name: string,
  description: string,
  date: string
}

export default function History() {
    const [category,setCategory] = useState<string>("Breakfast")
    const [allData,setAllData] = useState<Data[]>([])
    const handleChange = (categoryName: string) => {
        setCategory(categoryName)
      }

      useEffect(() => {

        const getHistory = async () => {
          const selectedCategory: number = (category  === "Breakfast") ? 1 : (category  === "Lunch") ? 2 : 3
          
          const responseAllData = await apiViewHistoryDiet({category_id: selectedCategory})
          
          setAllData(responseAllData.data)
        }
        getHistory()
       
      },[category])
  return (
    <div>
      <Header menu="History" />
      <DynamicLayout border={false}>
        <div className="mt-12">
        <div className="w-full py-2 px-4 border border-blue-500 rounded-xl flex gap-3 items-center">
            <FaSearch/>
            <input
              type="search"
              name=""
              id=""
              className="outline-none grow flex"
              placeholder="Search"
            />
          </div>
          <div className=" flex justify-center items-center xl:gap-28 lg:gap-24 md:gap-16 gap-12 my-8">
          <p className={category === "Breakfast" ? "text-custom-color" : '' + "hover:text-custom-orange hover:cursor-pointer"} onClick={() => handleChange("Breakfast")}>Breakfast</p>
            <p className={category === "Lunch" ? "text-custom-color" : '' + "hover:text-custom-orange hover:cursor-pointer"} onClick={() => handleChange("Lunch")}>Lunch</p>
            <p className={category === "Dinner" ? "text-custom-color" : '' + "hover:text-custom-orange hover:cursor-pointer"} onClick={() => handleChange("Dinner")}>Dinner</p>
          </div>
          <div>
            <p className="text-2xl">History</p>
            <div>
              {allData.map((data, index) => (

              <div key={index} className="flex my-4 bg-blue-500 rounded-3xl px-8 py-2 text-white items-center justify-between">
                <div>
                  <p className="text-xl font-bold">{data.food_name}</p>
                  <p className="text-sm">{data.description}</p>
                </div>
                <div>{new Date(data.date).toLocaleString()}</div>
              </div>
              ))}

            </div>
          </div>
        </div>
      </DynamicLayout>
    </div>
  );
}
