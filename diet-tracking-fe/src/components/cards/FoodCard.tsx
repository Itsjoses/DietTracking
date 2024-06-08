import React from "react";
import { FaTrash } from "react-icons/fa";
interface HomeTrustAttribute {
  food_name: string;
  description: string;
  calories: number;
}

export default function FoodCard({
  food_name,
  description,
  calories,
}: HomeTrustAttribute) {
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
        <FaTrash className="text-red-600 text-xl cursor-pointer"/>
      </div>
    </div>
  );
}
