import jwt from "jsonwebtoken";
import { dbConfig } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import bcryptjs from "bcryptjs";
import { tokenToData } from "@/utils/tokenToData";

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
        msg: "Something Went Wrong in Signup",
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

export const PUT = async (req) => {
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User doesn't exixt");
      return NextResponse.json(
        {
          msg: "Incorrect email or password",
          success: false,
          code: 2002,
        },
        { status: 500 }
      );
    }
    const passwordIsValid = await bcryptjs.compare(password, user.password);
    if (!passwordIsValid) {
      console.log("Wrong password !");
      return NextResponse.json(
        {
          msg: "Incorrect email or password",
          success: false,
          code: 2003,
        },
        { status: 500 }
      );
    }
    //! Token
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        msg: "Successfully Logged In",
        success: true,
        code: 2121,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        msg: "Server error",
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

export const GET = async (req) => {
  try {
    const userId = await tokenToData(req);
    if (!userId) {
      const response = NextResponse.json({
        msg: "Unauthorized",
        success: false,
      });
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      return response;
    }
    const user = await User.findOne({ _id: userId }).select("-password");
    if (user) {
      return NextResponse.json({
        success: true,
        code: 4000,
        msg: "User Found",
        user,
        success: true,
      });
    } else {
      const response = NextResponse.json({
        msg: "Unauthorized",
        success: false,
      });
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      return response;
    }
  } catch (error) {
    const response = NextResponse.json(
      { msg: "Something went wrong with token decodation" },
      { status: 501 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  }
};
