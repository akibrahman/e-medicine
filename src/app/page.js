import DisplayPage from "@/components/DisplayPage/DisplayPage";
import Sidebar from "@/components/Sidebar/Sidebar";
import { dbConfig } from "@/dbConfig/dbConfig";
import Category from "@/models/categoryModel";
import Product from "@/models/productModel";
import HomePage from "@/pages/HomePage";
import React from "react";

await dbConfig();

const page = async () => {
  const categories = await Category.find();
  const medicines = await Product.find();
  return <HomePage categories={categories} medicines={medicines} />;
};

export default page;
