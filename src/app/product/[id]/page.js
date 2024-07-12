import AddToCartDetailsButton from "@/components/AddToCartDetailsButton/AddToCartDetailsButton";
import DetailsMoreProducts from "@/components/AddToCartDetailsButton/DetailsMoreProducts";
import { dbConfig } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import Image from "next/image";
import React from "react";

await dbConfig();

const page = async ({ params }) => {
  const product = await Product.findById(params.id);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5 mb-10">
      <div className="flex flex-col md:flex-row">
        <Image
          className="w-full md:w-1/3 aspect-video rounded-md"
          src={product.photoUrl}
          alt={product.name}
          height={500}
          width={500}
        />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-sm text-gray-500 mt-2">{product.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-semibold">Company:</span>{" "}
            {product.company_name}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-semibold">Type:</span> {product.type}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-semibold">Amount per Strip:</span>{" "}
            {product.amount_per_strip}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-semibold">Stock:</span> {product.stock}
          </p>
        </div>
      </div>
      <AddToCartDetailsButton
        product={product}
        id={product._id}
        variants={product.variants}
      />
      <DetailsMoreProducts category={product.category} />
    </div>
  );
};

export default page;
