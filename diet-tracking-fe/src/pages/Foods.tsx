import React from 'react'
import DynamicLayout from '../components/layouts/DynamicLayout'
import Header from '../components/layouts/Header'
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
export default function Foods() {
  return (
    <div>
       <div>
      <Header menu="Food" />
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
          <div className='mt-6'>
            <div className='flex justify-between'>
            <p className="text-2xl font-semibold ">My Foods</p>
            <button className='bg-blue-500 rounded-xl px-4 py-2 text-white flex items-center gap-3'><FaPlus/>Create Food</button>
            </div>
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
    </div>
  )
}
