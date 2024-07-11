"use client";
import { AuthContext } from "@/app/providers/ContextProvider";
import Cart from "@/components/Cart/Cart";
import DisplayPage from "@/components/DisplayPage/DisplayPage";
import Sidebar from "@/components/Sidebar/Sidebar";
import React, { useContext, useState } from "react";

const HomePage = ({ categories, medicines }) => {
  const { setMainSidebar, mainSidebar } = useContext(AuthContext);

  const [activeMenu, setActiveMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  return (
    <div className="w-full duration-300 h-[calc(100vh-147px)] md:h-[calc(100vh-89px)] flex gap-0 relative">
      <Cart />
      <div
        className={`duration-300 h-full overflow-y-scroll border-r-2 border-[#424242] absolute z-50 md:z-auto bg-white md:relative top-0 left-0 ${
          mainSidebar ? "w-[70%] md:w-[25%]" : "w-0 md:w-0"
        }`}
      >
        <Sidebar
          categories={categories}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
      <div
        className={`duration-300 h-full overflow-y-scroll ${
          mainSidebar ? "w-full md:w-[75%]" : "w-full"
        }`}
      >
        <DisplayPage
          medicines={medicines}
          categories={categories}
          activeCategory={activeCategory}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      </div>
    </div>
  );
};

export default HomePage;
