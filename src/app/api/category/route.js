import Category from "@/models/categoryModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

const { dbConfig } = require("@/dbConfig/dbConfig");

await dbConfig();

export const POST = async (req) => {
  try {
    const data = await req.formData();
    // Extract fields from FormData
    const mainTitle = data.get("mainTitle"); //-------------
    const mainPhotoFile = data.get("mainPhotoFile");
    //
    const bytesM = await mainPhotoFile.arrayBuffer();
    const bufferM = Buffer.from(bytesM);
    const publicDirectoryM = join(process.cwd(), "public", "category");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const nameM = `${timestamp}-${mainPhotoFile.name}`;
    const pathM = join(publicDirectoryM, nameM);
    await writeFile(pathM, bufferM);
    const imageUrlM = `/category/${nameM}`; //-----------
    //
    // Extract subDatas array
    const subDataKeys = Array.from(data.keys()).filter(
      (key) => key.startsWith("files[") && key.endsWith("][photoFile]")
    );
    const subDatasPromises = subDataKeys.map(async (key) => {
      const index = key.match(/\[(\d+)\]/)[1];
      const photoFile = data.get(key);
      const title = data.get(`files[${index}][title]`);
      return { photoFile, title };
    });

    const subDatas = await Promise.all(subDatasPromises);

    const subs = await Promise.all(
      subDatas.map(async (sub) => {
        const bytes = await sub.photoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const publicDirectory = join(process.cwd(), "public", "category");
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const name = `${timestamp}-${sub.photoFile.name}`;
        const path = join(publicDirectory, name);
        await writeFile(path, buffer);
        const photoUrl = `/category/${name}`;

        return { photoUrl, title: sub.title };
      })
    );

    // Return a response
    const newCategory = new Category({
      title: mainTitle,
      photoUrl: imageUrlM,
      subs,
    });
    await newCategory.save();
    return NextResponse.json({
      msg: "Category created successfully",
      success: true,
    }); // Assuming NextResponse.json is a custom function for response handling
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
    const data = await req.formData();

    const mainTitle = data.get("mainTitle");
    const mainPhotoFile = data.get("mainPhotoFile");
    const mainPhotoUrl = data.get("mainPhotoUrl");
    const id = data.get("id");

    let imageUrlM = "";
    if (mainPhotoFile) {
      const bytesM = await mainPhotoFile.arrayBuffer();
      const bufferM = Buffer.from(bytesM);
      const publicDirectoryM = join(process.cwd(), "public", "category");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const nameM = `${timestamp}-${mainPhotoFile.name}`;
      const pathM = join(publicDirectoryM, nameM);
      await writeFile(pathM, bufferM);
      imageUrlM = `/category/${nameM}`;
    } else {
      imageUrlM = mainPhotoUrl;
    }

    const subDataKeys = Array.from(data.keys()).filter(
      (key) => key.startsWith("files[") && key.endsWith("][photoFile]")
    );
    const subDatasPromises = subDataKeys.map(async (key) => {
      const index = key.match(/\[(\d+)\]/)[1];
      const photoFile = data.get(key);
      const title = data.get(`files[${index}][title]`);
      return { photoFile, title };
    });

    const subDatas = await Promise.all(subDatasPromises);

    console.log(subDatas);

    const newSubs = await Promise.all(
      subDatas.map(async (sub) => {
        const bytes = await sub.photoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const publicDirectory = join(process.cwd(), "public", "category");
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const name = `${timestamp}-${sub.photoFile.name}`;
        const path = join(publicDirectory, name);
        await writeFile(path, buffer);
        const photoUrl = `/category/${name}`;

        return { photoUrl, title: sub.title };
      })
    );

    const subDataKeysOld = Array.from(data.keys()).filter(
      (key) => key.startsWith("oldfiles[") && key.endsWith("][photoUrl]")
    );
    const subDatasPromisesOld = subDataKeysOld.map(async (key) => {
      const index = key.match(/\[(\d+)\]/)[1];
      const photoUrl = data.get(key);
      const title = data.get(`oldfiles[${index}][title]`);
      return { photoUrl, title };
    });

    const subDatasOld = await Promise.all(subDatasPromisesOld);

    console.log(newSubs, subDatasOld);

    await Category.findByIdAndUpdate(id, {
      title: mainTitle,
      photoUrl: imageUrlM,
      subs: [...subDatasOld, ...newSubs],
    });

    return NextResponse.json({
      msg: "Category updated successfully",
      success: true,
    });

    // const subDataKeys = Array.from(data.keys()).filter(
    //   (key) => key.startsWith("files[") && key.endsWith("][photoFile]")
    // );
    // const subDatasPromises = subDataKeys.map(async (key) => {
    //   const index = key.match(/\[(\d+)\]/)[1];
    //   const photoFile = data.get(key);
    //   const title = data.get(`files[${index}][title]`);
    //   return { photoFile, title };
    // });

    // const subDatas = await Promise.all(subDatasPromises);

    const subs = await Promise.all(
      subDatas.map(async (sub) => {
        const bytes = await sub.photoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const publicDirectory = join(process.cwd(), "public", "category");
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const name = `${timestamp}-${sub.photoFile.name}`;
        const path = join(publicDirectory, name);
        await writeFile(path, buffer);
        const photoUrl = `/category/${name}`;

        return { photoUrl, title: sub.title };
      })
    );

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
