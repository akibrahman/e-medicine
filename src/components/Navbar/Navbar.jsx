"use client";
import React from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { BiSolidFirstAid } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b-4 border-primary py-5 px-4">
      <div className="flex items-center gap-6">
        <div className="p-2 bg-primary rounded-md w-max text-white text-xl cursor-pointer duration-300 active:scale-90">
          <HiMiniBars3BottomLeft />
        </div>
        <Link href={"/"} className="flex items-center gap-1">
          <BiSolidFirstAid className="text-4xl text-primary" />
          <p className="text-4xl text-[#E8292F] font-black">Medicine</p>
        </Link>
      </div>

      <div className="flex items-center">
        <input
          type="text"
          name=""
          placeholder="Search your medicine"
          className="bg-transparent border border-[#9A9A9A] border-r-0 placeholder:text-[#9A9A9A] placeholder:text-sm rounded-s px-2 py-1 outline-none text-[#9A9A9A] w-[500px]"
        />
        <div className="bg-primary text-xl text-white font-semibold h-[34px] rounded-e flex items-center justify-center px-2 cursor-pointer duration-300 active:scale-90">
          <CiSearch className="" />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-1">
          <IoLocationOutline className="text-red-600 font-semibold" />
          <p className="text-xs tex-[#323232]">Sirajganj</p>
        </div>
        <div className="p-2.5 rounded-full bg-primary relative">
          <p className="text-[10px] text-white bg-red-600 rounded-full absolute top-0 right-0 h-3.5 w-3.5 flex items-center justify-center">
            4
          </p>
          <BsCart3 className="text-white text-lg font-bold" />
        </div>
        <Link
          href={"/login"}
          className="bg-primary text-white px-3 py-2 rounded-md duration-300 active:scale-90 text-sm"
        >
          Login / Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
