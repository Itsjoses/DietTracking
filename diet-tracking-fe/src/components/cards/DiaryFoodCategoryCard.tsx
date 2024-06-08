import React from "react";
import { apiDeleteDietFood } from "../../api/food";
import { BiTrash } from "react-icons/bi";

interface Data {
  id: number,
  food_name: string;
  description: string;
  calories: number;
}
  
  interface DiaryFoodCategoryCardProps {
    data: Data[];
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  }
  export default function DiaryFoodCategoryCard({ data,setRefresh }: DiaryFoodCategoryCardProps) {
    if (data.length === 0) {
      return <p className="flex justify-between items-center w-full  py-4">Add Food</p>;
    }

    const deleteDietFood = async(foodId: number) => {
      await apiDeleteDietFood(foodId)
      setRefresh(prev => !prev)
    }
  
    return (
      <>
        {data.map((foodItem: any, index) => (
            <div key={index}  className="flex justify-between items-center w-full border-b py-4">
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold">{foodItem.food_name}</p>
                <p className="text-orange-300">{foodItem.calories} Calories</p>
                <BiTrash className="text-red-500 text-2xl cursor-pointer" onClick={() => deleteDietFood(foodItem.id)}/>
              </div>
              <p className="text-sm">{foodItem.description}</p>
            </div>
    
        ))}
      </>
    );
  }
