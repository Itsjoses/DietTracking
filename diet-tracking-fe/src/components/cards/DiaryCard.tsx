import React, { useEffect, useState } from 'react'
import DynamicLayout from '../layouts/DynamicLayout'
import { PiTarget } from 'react-icons/pi'
import { CiForkAndKnife } from 'react-icons/ci'
import { apiViewAllDietDiary } from '../../api/food';

interface BalanceDiet{
  target:number,
  consume:number
}

export default function DiaryCard({target,consume}: BalanceDiet) {
  const [percentageCalculation,setPercentageCalculation] = useState<number>(0)
  useEffect(() => {
    let percentageCalculation = (consume/target)*100
    
    if(percentageCalculation > 100){
      percentageCalculation = 100
    }
    setPercentageCalculation(percentageCalculation)
  },[target,consume])
  return (
        <div className="flex my-12 w-3/5  mx-auto gap-6">
          <div className="w-3/5 border border-custom-color p-4 gap-2 rounded-md flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-semibold">Calories</p>
                <p className="text-xs">Balance = Target - Consumed </p>
              </div>
              <p className="text-5xl font-bold">{target - consume}</p>
            </div>
            <div className="grow bg-gray-300 h-12 my-4">
              <div style={{ width: `${percentageCalculation}%` }} className="h-full bg-custom-color"></div>
      
            </div>
          </div>
          <div className="w-2/5 flex flex-col gap-6">
            <div className="border border-custom-color flex p-4 gap-4 rounded-md">
              <PiTarget className="text-2xl" />
              <div>
                <p>Target</p>
                <p>{target} Calories</p>
              </div>
            </div>
            <div className="border border-custom-color  flex p-4 gap-4 rounded-md">
              <CiForkAndKnife className="text-2xl" />
              <div>
                <p>Consume</p>
                <p>{consume} Calories</p>
              </div>
            </div>
          </div>
        </div>
  )
}
