import Order from "@/models/orderModel";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

const { dbConfig } = require("@/dbConfig/dbConfig");

await dbConfig();

export const POST = async (req) => {
  const data = await req.json();
  let info = {
    name: data.name,
    address: data.address,
    phone: data.phone,
    paymentMethode: data.paymentMethode,
    status: data.status,
    createdAt: data.createdAt,
    userId: data.userId,
    totalRegularPrice: data.totalRegularPrice,
    totalDiscount: data.totalDiscount,
    totalPrice: data.totalPrice,
  };
  const products = data.carts.map((cart) => ({
    id: cart._id,
    mg: cart.variants.mg,
    count: parseInt(cart.count),
  }));

  await Promise.all(
    products.map(async (product) => {
      const exProduct = await Product.findById(product.id);
      await Product.findByIdAndUpdate(product.id, {
        stock: parseInt(exProduct.stock) - product.count,
      });
    })
  );

  info.paymentMethode == "cod" ? (info.paid = false) : (info.paid = true);
  try {
    await new Order({ ...info, carts: products }).save();
    return NextResponse.json({
      msg: "Order placed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        msg: error.message || "Server error, Try again!",
        success: false,
      },
      { status: 500 }
    );
  }
};
