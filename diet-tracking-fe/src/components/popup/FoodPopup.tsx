import React, { useEffect, useState } from "react";
import { apiFood } from "../../api/food";
import FoodCard from "../cards/FoodCard";
import DiaryFoodCard from "../cards/DiaryFoodCard";
interface foods {
  id: number;
  food_name: string;
  description: string;
  calories: number;
}

interface FoodPopupProps {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  categoryId: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function FoodPopup({ setPopup,categoryId ,setRefresh}: FoodPopupProps) {
  const [datas, setDatas] = useState<foods[]>([]);
  useEffect(() => {
    const getData = async () => {
      const data = await apiFood();
      setDatas(data);
    };
    getData();
  }, []);
  return (
    <div className="fixed w-screen h-screen flex justify-center items-center bg-black/70 z-30">
      <div className="w-[60%] h-[80%] bg-white z-50 p-6 relative">
        <div
          className="absolute right-8 text-2xl cursor-pointer"
          onClick={() => setPopup((prev) => !prev)}
        >
          X
        </div>

        <p className="text-3xl font-semibold">Select Food</p>
        {datas.length > 0 ? (
          datas.map((data, index) => (
            <DiaryFoodCard
              key={index}
              id={data.id}
              food_name={data.food_name}
              description={data.description}
              calories={data.calories}
              category_id={categoryId}
              setRefresh={setRefresh}
              setPopup={setPopup}
            />
          ))
        ) : (
          <p>No foods available</p>
        )}
      </div>
    </div>
  );
}
