import { PiTarget } from "react-icons/pi";
import { CiForkAndKnife } from "react-icons/ci";
import Header from "../../components/layouts/Header";
import DynamicLayout from "../../components/layouts/DynamicLayout";
import "./Diary.css";
import { FaPlus } from "react-icons/fa";
import { apiCreateDietDiary } from "../../api/food";
import FoodPopup from "../../components/popup/FoodPopup";
import { useState } from "react";

export default function Diary() {
  // const
  // const createNewDiary = async (category : string) => {
  //   const createDietDiary = await apiCreateDietDiary()
  // }

  const [popup,setPopup] = useState<boolean>(false)
  const [categoryId,setCategoryId] = useState<number>(0)
  const handlePopup = (category: number) => {
    setPopup(prev => ! prev)
    setCategoryId(category)
  }

  return (
    <div>
      {popup && (

      <FoodPopup setPopup={setPopup} categoryId={categoryId} />
      )}
      <Header menu="Home" />
      <DynamicLayout border={false}>
        <div className="flex my-12 w-3/5  mx-auto gap-6">
          <div className="w-3/5 border border-custom-color p-4 gap-2 rounded-md flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-semibold">Calories</p>
                <p className="text-xs">Balance = Target - Consumed </p>
              </div>
              <p className="text-5xl font-bold">-100</p>
            </div>
            <div className="grow bg-gray-300 h-12 my-4">
              <div className="w-[80%] h-full bg-custom-color"></div>
            </div>
          </div>
          <div className="w-2/5 flex flex-col gap-6">
            <div className="border border-custom-color flex p-4 gap-4 rounded-md">
              <PiTarget className="text-2xl" />
              <div>
                <p>Target</p>
                <p>1520 Calories</p>
              </div>
            </div>
            <div className="border border-custom-color  flex p-4 gap-4 rounded-md">
              <CiForkAndKnife className="text-2xl" />
              <div>
                <p>Consume</p>
                <p>1520 Calories</p>
              </div>
            </div>
          </div>
        </div>
      </DynamicLayout>
      <DynamicLayout border={false}>
        <div className="my-4">
          <div className="bg-custom-color px-6 py-4 text-white flex justify-between border-b rounded-tl-lg rounded-tr-lg items-center border-white">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold">Breakfast</p>
              <div className="bg-red-500 p-1 rounded-md cursor-pointer">
                <FaPlus className="text-lg" onClick={() => handlePopup(1)} />
              </div>
            </div>
            <p>0</p>
          </div>
          <div className="bg-custom-color px-6 py-4 text-white flex justify-between border-b rounded-bl-lg rounded-br-lg items-center">
            <div className="flex justify-between items-center w-full border-b py-4">
              <p className="text-xl font-bold">Fried Chicken</p>
              <p className="text-sm">270 cal, 120gr</p>
            </div>
          </div>
        </div>
      </DynamicLayout>

      <DynamicLayout border={false}>
        <div className="my-4">
          <div className="bg-custom-color px-6 py-4 text-white flex justify-between border-b rounded-tl-lg rounded-tr-lg items-center border-white">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold">Lunch</p>
              <div className="bg-red-500 p-1 rounded-md cursor-pointer">
                <FaPlus className="text-lg " onClick={() => handlePopup(2)}/>
              </div>
            </div>
            <p>0</p>
          </div>
          <div className="bg-custom-color px-6 py-4 text-white flex justify-between border-b rounded-bl-lg rounded-br-lg items-center">
            <div className="flex justify-between items-center w-full border-b py-4">
              <p className="text-xl font-bold">Fried Chicken</p>
              <p className="text-sm">270 cal, 120gr</p>
            </div>
          </div>
        </div>
      </DynamicLayout>

      <DynamicLayout border={false}>
        <div className="my-4">
          <div className="bg-custom-color px-6 py-4 text-white flex justify-between border-b rounded-tl-lg rounded-tr-lg items-center border-white">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold">Dinner</p>
              <div className="bg-red-500 p-1 rounded-md cursor-pointer">
                <FaPlus className="text-lg " onClick={() => handlePopup(3)}/>
              </div>
            </div>
            <p>0</p>
          </div>
          <div className="bg-custom-color px-6 py-4 text-white flex justify-between border-b rounded-bl-lg rounded-br-lg items-center">
            <div className="flex justify-between items-center w-full border-b py-4">
              <p className="text-xl font-bold">Fried Chicken</p>
              <p className="text-sm">270 cal, 120gr</p>
            </div>
          </div>
        </div>
      </DynamicLayout>
    </div>
  );
}
