import Sidebar from "@/components/Sidebar/Sidebar";
import { dbConfig } from "@/dbConfig/dbConfig";
import Category from "@/models/categoryModel";
import React from "react";

await dbConfig();

const page = async () => {
  const categories = await Category.find();
  return (
    <div className="grid grid-cols-4 h-[calc(100vh-84px)]">
      <div className="border-r-2 border-[#424242]">
        <Sidebar categories={categories} />
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default page;
