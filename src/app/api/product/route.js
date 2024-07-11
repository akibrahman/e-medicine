import Product from "@/models/productModel";
import { unlink, writeFile } from "fs/promises";
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

export const PUT = async (req) => {
  try {
    const data = await req.formData();
    const product = JSON.parse(data.get("product"));
    const file = data.get("file");
    if (file) {
      const existingProduct = await Product.findById(product._id);
      if (existingProduct.photoUrl) {
        const oldFilePath = join(
          process.cwd(),
          "public",
          existingProduct.photoUrl
        );
        await unlink(oldFilePath);
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const publicDirectory = join(process.cwd(), "public", "product");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const name = `${timestamp}-${file.name}`;
      const path = join(publicDirectory, name);
      await writeFile(path, buffer);
      const photoUrl = `/product/${name}`;
      product.photoUrl = photoUrl;
    }

    await Product.findByIdAndUpdate(product._id, product);

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
export const DELETE = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const existingProduct = await Product.findById(id);
    const oldFilePath = join(process.cwd(), "public", existingProduct.photoUrl);
    await unlink(oldFilePath);
    await Product.findByIdAndDelete(id);
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

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const category = searchParams.get("category");
    const pageNumber = parseInt(searchParams.get("page"));
    const itemPerPage = 5;
    let query = {};
    if (id) query = { ...query, _id: id };
    if (category) query = { ...query, category: category };
    const products = await Product.find(query)
      .skip(pageNumber * itemPerPage)
      .limit(itemPerPage);
    const count = await Product.find(query);
    console.log(count);
    return NextResponse.json({
      msg: "Products fetched successfully",
      success: true,
      products,
      count: count.length,
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
