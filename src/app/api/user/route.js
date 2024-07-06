import jwt from "jsonwebtoken";
import { dbConfig } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import bcryptjs from "bcryptjs";

await dbConfig();

export const POST = async (req) => {
  try {
    const reqData = await req.formData();
    const photoData = reqData.get("file");
    const userData = {
      name: reqData.get("name"),
      email: reqData.get("email"),
      password: reqData.get("password"),
    };
    //
    const isExist = await User.findOne({ email: userData.email });
    if (isExist) {
      return NextResponse.json(
        {
          msg: "User Already Exist",
          success: false,
        },
        {
          status: 501,
        }
      );
    }
    //
    console.log(userData.password);
    //! Hashing
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(userData.password, salt);
    //
    const bytes = await photoData.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const publicDirectory = join(process.cwd(), "public", "images");
    const path = join(publicDirectory, photoData.name);
    await writeFile(path, buffer);
    const imageUrl = `/images/${photoData.name}`;
    //
    //
    const newUser = new User({
      name: userData.name,
      email: userData.email,
      password: hashPassword,
      photo: imageUrl,
      role: "user",
    });
    const savedUser = await newUser.save();
    //
    //! Token
    const tokenData = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    //
    //
    const response = NextResponse.json({
      msg: "SignUp successful",
      user: savedUser,
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
    //
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        msg: "Something Went Wrong in Login",
        error,
        success: false,
        code: 2001,
      },
      {
        status: 500,
      }
    );
  }
};