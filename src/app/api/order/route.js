import { dbConfig } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

await dbConfig();

export const PUT = async (req) => {
  try {
    const { id, target, newStatus, newPayment } = await req.json();
    if (target == "status") {
      // const { id, newStatus } = await req.json();
      await Order.findByIdAndUpdate(id, { status: newStatus });
    } else if (target == "payment") {
      // const { id, newPayment } = await req.json();
      await Order.findByIdAndUpdate(id, { paid: JSON.parse(newPayment) });
    }
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

// export const DELETE = async (req) => {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     const existingProduct = await Product.findById(id);
//     const oldFilePath = join(process.cwd(), "public", existingProduct.photoUrl);
//     await unlink(oldFilePath);
//     await Product.findByIdAndDelete(id);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         success: false,
//         msg: error.msg || "Server error, Try again!",
//       },
//       { status: 500 }
//     );
//   }
// };

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const id = searchParams.get("id");
    const pageNumber = parseInt(searchParams.get("page"));
    const itemPerPage = 5;

    let aggrigate = [
      {
        $addFields: {
          userIdObj: { $toObjectId: "$userId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userIdObj",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ];

    if (userId) aggrigate.push({ $match: { userId } });
    if (id)
      aggrigate.push({ $match: { _id: new mongoose.Types.ObjectId(id) } });
    if (id) {
      const orders = await Order.aggregate(aggrigate);

      return NextResponse.json({
        msg: "Orders fetched successfully",
        success: true,
        orders,
      });
    } else {
      const orders = await Order.aggregate(aggrigate)
        .skip(pageNumber * itemPerPage)
        .limit(itemPerPage);

      const count = await Order.aggregate(aggrigate);

      return NextResponse.json({
        msg: "Orders fetched successfully",
        success: true,
        orders,
        count: count.length,
      });
    }
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
