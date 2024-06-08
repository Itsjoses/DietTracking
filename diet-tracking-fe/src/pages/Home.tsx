import React, { useEffect, useState } from "react";
import DynamicLayout from "../components/layouts/DynamicLayout";
import Header from "../components/layouts/Header";
import HomeTrust from "../components/cards/HomeTrust";
import { GiSushis } from "react-icons/gi";
import { GiCampCookingPot } from "react-icons/gi";
import { MdRoomService } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { CiViewList } from "react-icons/ci";
import DiaryCard from "../components/cards/DiaryCard";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/AuthContext";
import { apiViewAllDietDiary } from "../api/food";
import { apiGetBmi } from "../api/auth";
export default function Home() {
  const {user} = useUser()
  const [allCategoryScore, setAllCategoryScore] = useState<number>(0);
  const [totalTargetBmi, setTotalTargetBmi] = useState<number>(0);
  useEffect(() => {
    
    if(user){

    const getData = async() => {
        const responseAllData = await apiViewAllDietDiary();
        const dailyBmiTake = await apiGetBmi()
        const allCategoryScore = responseAllData.data.reduce(
          (total: any, item: any) => total + item.calories,
          0

        );
        
        setAllCategoryScore(allCategoryScore)
        setTotalTargetBmi(dailyBmiTake.dailyCaloricIntake)
    }
    getData()
  }

  },[user])

  return (
    <div>
      <Header menu="Home" />
      {user ? (
        <DynamicLayout border={false}>
        <div className="my-8">
          <DiaryCard target={totalTargetBmi} consume={allCategoryScore} />
          <div className="text-end flex justify-center w-full ">
            <div className="w-8/12 flex justify-end ">
              <Link to={"/diary"} className="border-b border-black w-fit text-custom-color cursor-pointer">View More</Link>
            </div>
          </div>
        </div>
      </DynamicLayout>
      ): (
        <DynamicLayout border={false}>
        <div className="py-8 flex-col-reverse md:flex-row flex items-center">
          <div className="w-4/5 md:w-1/2 flex flex-col gap-4">
            <p className="md:w-11/12 w-11/12 font-Merienda text-custom-color xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">
              Diet is importance <br /> for make body healthy
            </p>
            <p className="xl:text-lg lg:text-sm text-xs">
            Want to go on a diet? Let's create a healthy and balanced meal plan for
              helps you achieve your ideal body weight target. With Tracking
              Diet, you can combine your progress every day and keep
              motivated on your journey to better health.


            </p>
            <Link to={"/login"} className="text-white relative w-fit bg-red-600 before:md:top-1 before:md:left-1 before:lg:top-2 before:lg:left-2 before:top-2 before:left-2 before:w-full before:h-full before:absolute before:border before:-z-50 before:border-red-500 lg:px-8 lg:py-2 md:px-6 md:py-1 px-6 py-2">
              Start now
            </Link>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center ">
            <img
              src={"/home/home-food.png"}
              alt=""
              className="object-contain xl:w-8/12 xl:h-8/12 md:w-9/12 md:h-9/12 w-5/12 h-5/12"
            />
          </div>
        </div>
      </DynamicLayout>
      )}
 
      
      <DynamicLayout border={false}>
        <div className="mb-12 my-20 flex flex-col md:gap-28 gap-16">
          <p className="flex justify-center font-Merienda lg:text-5xl md:text-4xl text-3xl">
            REASON TO USING US
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-14 gap-12">
            <HomeTrust Icon={TbTargetArrow} title={"target Goals"}>
              Do you want to lose weight, decrease your BMI, or start living a
              healthier lifestyle? We have outstanding features that can help
              you achieve those goals. Gua is a website specifically designed to
              assist you in your weight loss journey by calculating your BMI.
              With the various tools and resources we provide, you can track
              your progress, receive personalized advice, and stay motivated to
              achieve a healthier and fitter body. Let's start your health
              journey with us and realize your dream of having an ideal weight
              and a healthier lifestyle.
            </HomeTrust>
            <HomeTrust Icon={CiViewList} title={"Easier to Recorded"}>
              Want to lose weight, decrease BMI, or start living a healthier
              life? We have great features to help you. Gua is a website
              designed to help you lose weight by calculating your BMI. With
              various tools and resources we provide, you can track your
              progress, get personalized advice, and stay motivated to achieve a
              healthier and fitter body. Start your health journey with us and
              realize your dream of having an ideal weight and a healthier
              lifestyle. artistry.
            </HomeTrust>
            <HomeTrust Icon={MdRoomService} title={"Best Services"}>
              We offer top-notch services to help you achieve your health and
              fitness goals. Get accurate BMI calculations to understand your
              weight status and target. Use our quick food tracking tools to log
              your intake and stay on a healthy diet. Save favorite foods and
              healthy recipes for easy meal planning. Receive personalized
              advice tailored to your health needs and goals. Track your
              progress regularly to see impactful changes. Join our supportive
              community for motivation from fellow users. We're committed to
              supporting you every step towards a healthier lifestyle and ideal
              weight. Start now and take advantage of our excellent features to
              realize your dreams.
            </HomeTrust>
          </div>
        </div>
      </DynamicLayout>
    </div>
  );
}
