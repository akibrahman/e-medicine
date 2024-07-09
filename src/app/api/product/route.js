import Product from "@/models/productModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

const { dbConfig } = require("@/dbConfig/dbConfig");

await dbConfig();

export const POST = async (req) => {
  try {
    const data = await req.formData();
    const file = data.get("file");
    const product = JSON.parse(data.get("product"));

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const publicDirectory = join(process.cwd(), "public", "product");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const name = `${timestamp}-${file.name}`;
    const path = join(publicDirectory, name);
    await writeFile(path, buffer);
    const photoUrl = `/product/${name}`;

    product.photoUrl = photoUrl;

    await new Product(product).save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        msg: error.msg || "Server error, Try again!",
      },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const products = await Product.find();
    return NextResponse.json({
      msg: "Products fetched successfully",
      success: true,
      products,
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
