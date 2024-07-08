"use client";
import DisplayPage from "@/components/DisplayPage/DisplayPage";
import Sidebar from "@/components/Sidebar/Sidebar";
import React, { useState } from "react";

const HomePage = ({ categories, medicines }) => {
  const [activeMenu, setActiveMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  return (
    <div className="grid grid-cols-4 h-[calc(100vh-89px)]">
      <div className="border-r-2 border-[#424242]">
        <Sidebar
          categories={categories}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
      <div className="col-span-3">
        <DisplayPage
          activeMenu={activeMenu}
          activeCategory={activeCategory}
          medicines={medicines}
        />
      </div>
    </div>
  );
};

export default HomePage;
