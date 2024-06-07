import { Link } from "react-router-dom";
import DynamicLayout from "./DynamicLayout";
import { IoCart } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
var selected =
  "text-custom-color relative before:absolute before:w-2 before:h-2 before:rounded-full before:lg:-bottom-2 before:md:-bottom-1 before:left-1/2 before:bg-custom-color before:-translate-x-1/2 before:-translate-y-1/2";
export default function Header({ menu }: { menu: string }) {
  const [hamburger, setHamburger] = useState<boolean>(false);

  const hamburgerToggle = () => {
    setHamburger((prevHamburger) => !prevHamburger);
  };

  return (
    <div>
      <div
        className={`transform ${
          !hamburger ? "-translate-x-full" : "translate-x-0"
        } transition-transform ease-in duration-150 fixed flex flex-col font-Merienda w-full h-screen items-center justify-center gap-24 bg-[#333333] z-40 md:hidden`}
      >
        <div
          className="absolute top-0 right-0 text-white z-50 p-6"
          onClick={hamburgerToggle}
        >
          <IoMdClose className="text-2xl" />
        </div>
        <Link
          to={"/"}
          className={
            (menu === "Home" ? "text-custom-color " : "") +
            "hover:text-custom-color hover:cursor-pointer text-3xl z-50"
          }
        >
          Home
        </Link>
        <Link
          to={"/history"}
          className={
            (menu === "Menu" ? "text-custom-color " : "") +
            "hover:text-custom-color hover:cursor-pointer text-3xl z-50"
          }
        >
          History
        </Link>
        <Link
          to={"/food"}
          className={
            (menu === "About" ? "text-custom-color " : "") +
            "hover:text-custom-color hover:cursor-pointer text-3xl z-50"
          }
        >
          Food
        </Link>
      </div>
      <div className="drop-shadow-2xl shadow-md">
        <DynamicLayout border={true}>
          <div className="flex justify-between py-6 mb-2 relative">
            <div className="flex items-center gap-4">
              <div>
                <RxHamburgerMenu
                  className="text-2xl md:hidden inline-block"
                  onClick={hamburgerToggle}
                />
              </div>
              <Link to={"/"}>

              <div className="font-Merienda text-2xl text-custom-color font-bold">
                Diet Tracking
              </div>
              </Link>
            </div>
            <div className="gap-6 lg:gap-10 xl:gap-12 font-Merienda md:flex hidden">
              <Link
                to={"/"}
                className={
                  menu === "Home"
                    ? selected
                    : "" + "hover:text-custom-color hover:cursor-pointer"
                }
              >
                Home
              </Link>
              <Link
                to={"/history"}
                className={
                  menu === "History"
                    ? selected
                    : "" + "hover:text-custom-color hover:cursor-pointer"
                }
              >
                History
              </Link>
              <Link
                to={"/foods"}
                className={
                  menu === "Food"
                    ? selected
                    : "" + "hover:text-custom-color hover:cursor-pointer"
                }
              >
                Food
              </Link>
            </div>
            <Link
              to={"/login"}
              className="bg-custom-color md:px-4 md:py-2 text-white md:text-base text-xs px-2 py-2"
            >
              {" "}
              Login/Register
            </Link>
          </div>
        </DynamicLayout>
      </div>
    </div>
  );
}
