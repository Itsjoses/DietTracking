import React from "react";
import { FaTrash } from "react-icons/fa";
import { apiDeleteFood } from "../../api/food";
interface HomeTrustAttribute {
  id:number;
  food_name: string;
  description: string;
  calories: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FoodCard({
  id,
  food_name,
  description,
  calories,
  setRefresh
}: HomeTrustAttribute) {

  const deleteFood = async(id:number) => {
    await apiDeleteFood(id)
    setRefresh(prev => !prev)
  }
  return (
    <div className="flex my-4 bg-blue-500 rounded-3xl px-8 py-2 text-white items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-8">
          <p className="text-xl font-bold">{food_name}</p>
          <div>
            <span className="text-xl">{calories}</span>{" "}
            <span className="text-orange-300">calories</span>
          </div>
        </div>
        <p className="text-sm">{description}</p>
      </div>
      <div>
        <FaTrash className="text-red-600 text-xl cursor-pointer" onClick={() => {deleteFood(id)}}/>
      </div>
    </div>
  );
}
