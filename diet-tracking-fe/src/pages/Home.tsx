import React from 'react'
import DynamicLayout from '../components/layouts/DynamicLayout'
import Header from '../components/layouts/Header'

export default function Home() {
  return (
    <div>

      <Header menu='Home'/>
      <DynamicLayout border={false}>
        <div className="py-8 flex-col-reverse md:flex-row flex items-center">
          <div className="w-4/5 md:w-1/2 flex flex-col gap-4">
            <p className="md:w-11/12 w-11/12 font-Merienda text-custom-color xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">
            Diet is importance <br /> for make body healthy
            </p>
            <p className="xl:text-lg lg:text-sm text-xs">
Ingin diet? Mari buat rencana makan yang sehat dan seimbang untuk membantu Anda mencapai target berat badan ideal. Dengan Pelacakan Diet, Anda dapat memantau kemajuan Anda setiap hari dan tetap termotivasi dalam perjalanan menuju kesehatan yang lebih baik.
            </p>
            <button className="text-white relative w-fit bg-red-600 before:md:top-1 before:md:left-1 before:lg:top-2 before:lg:left-2 before:top-2 before:left-2 before:w-full before:h-full before:absolute before:border before:-z-50 before:border-red-500 lg:px-8 lg:py-2 md:px-6 md:py-1 px-6 py-2">
              Start now
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center ">
            <img src={"/home/home-food.png"} alt="" className="object-contain xl:w-8/12 xl:h-8/12 md:w-9/12 md:h-9/12 w-5/12 h-5/12"  />
          </div>
        </div>
      </DynamicLayout>
    </div>
        
  )
}
