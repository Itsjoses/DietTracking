import React, { useState } from "react";
import Header from "../components/layouts/Header";
import DynamicLayout from "../components/layouts/DynamicLayout";
import { FaSearch } from "react-icons/fa";

export default function History() {
    const [category,setCategory] = useState<string>("Breakfast")
    const handleChange = (categoryName: string) => {
        setCategory(categoryName)
      }
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
              <div className="flex my-4 bg-blue-500 rounded-3xl px-8 py-2 text-white items-center justify-between">
                <div>
                  <p className="text-xl font-bold">Fried Chicken</p>
                  <p className="text-sm">270 cal, 120gr - 1 pcs</p>
                </div>
                <div>10/09/2024</div>
              </div>
            </div>
          </div>
        </div>
      </DynamicLayout>
    </div>
  );
}
