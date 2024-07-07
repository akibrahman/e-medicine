import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

const { dbConfig } = require("@/dbConfig/dbConfig");

await dbConfig();

export const POST = async (req) => {
  try {
    const { mainCategory, subcategories } = await req.json();
    const newCategory = new Category({
      title: mainCategory,
      subs: subcategories,
    });
    await newCategory.save();
    return NextResponse.json({
      msg: "Category created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        msg: error.msg || "Server error",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  try {
    const { mainCategory, subcategories, id } = await req.json();
    await Category.findByIdAndUpdate(id, {
      title: mainCategory,
      subs: subcategories,
    });
    return NextResponse.json({
      msg: "Category updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        msg: error.msg || "Server error",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const categories = await Category.find();
    return NextResponse.json({
      msg: "Categories fetched successfully",
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        msg: error.msg || "Server error",
        success: false,
      },
      { status: 500 }
    );
  }
};
