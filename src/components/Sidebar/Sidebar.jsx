"use client";
import Image from "next/image";
import React, { useState } from "react";
import { PiTagSimpleFill } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";

const Sidebar = ({
  categories,
  activeMenu,
  setActiveMenu,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="w-full p-4 select-none">
      <p className="flex items-center gap-2 px-1 py-3">
        <PiTagSimpleFill className="text-red-500 text-xl" />
        Favourites
      </p>
      <div className="bg-secondary rounded-md font-medium">
        {categories.map((category) => (
          <>
            <div
              onClick={() => {
                if (activeCategory != category.title) {
                  setActiveCategory(category.title);
                  setActiveMenu([
                    "category",
                    category.title,
                    category.subs.length,
                  ]);
                } else {
                  setActiveCategory("");
                  setActiveMenu([]);
                }
              }}
              key={category._id}
              className={`flex items-center gap-2 px-3 py-3 cursor-pointer duration-300 active:scale-90 hover:scale-105 rounded-md ${
                activeCategory == category.title && "bg-primary text-white"
              }`}
            >
              <Image
                src={category.photoUrl}
                alt={category.title}
                height={20}
                width={20}
                className="aspect-square rounded-md"
              />
              <p className="flex-grow">{category.title}</p>
              {category.subs.length > 0 && <IoIosArrowDown />}
            </div>
            {category.subs.length > 0 && (
              <div
                className={`duration-300 transition-all ${
                  activeCategory == category.title
                    ? "max-h-[1000px] pointer-events-auto opacity-100"
                    : "max-h-0 pointer-events-none opacity-0"
                }`}
              >
                {category.subs.map((sub, i) => (
                  <div
                    onClick={() => {
                      setActiveMenu(["subcategory", sub.title, 0]);
                    }}
                    key={i}
                    className={`flex items-center gap-2 px-3 py-3 pl-16 cursor-pointer duration-300 active:scale-90 hover:scale-105 rounded-md ${
                      activeMenu[0] == "subcategory" &&
                      activeMenu[1] == sub.title &&
                      "bg-primary text-white"
                    }`}
                  >
                    <Image
                      src={sub.photoUrl}
                      alt={sub.title}
                      height={20}
                      width={20}
                      className="aspect-square rounded-md"
                    />
                    <p className="flex-grow">{sub.title}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
