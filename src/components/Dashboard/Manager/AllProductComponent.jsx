import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { FaDeleteLeft, FaPencil } from "react-icons/fa6";

const AllProductComponent = () => {
  const { data: products } = useQuery({
    queryKey: ["products", "manager dashboard"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/product");
        if (data.success) return data.products;
        else return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });
  if (!products) return;
  return (
    <div className="p-4">
      <p className="text-primary text-center underline text-xl">
        Products Management Section
      </p>
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex items-center justify-between px-3 py-2 bg-primary font-medium text-white rounded">
          <p className="w-[14%] text-center">Image</p>
          <p className="w-[14%] text-center">Name</p>
          <p className="w-[14%] text-center">Company Name</p>
          <p className="w-[14%] text-center">Type</p>
          <p className="w-[30%] text-center">Description</p>
          <p className="w-[14%] text-center">Actiion</p>
        </div>
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between px-3 py-2 text-primary font-medium shadow shadow-primary rounded"
          >
            <Image
              src={product.photoUrl}
              alt={product.name}
              height={80}
              width={80}
              className="aspect-video w-[14%] mx-auto"
            />
            <p className="w-[14%] text-center">{product.name}</p>
            <p className="w-[14%] text-center">{product.company_name}</p>
            <p className="w-[14%] text-center">{product.type}</p>
            <p className="w-[30%] text-center">{product.description}</p>
            <div className="flex items-center justify-center gap-2 w-[14%]">
              <div className="w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center cursor-pointer duration-300 active:scale-90">
                <FaPencil className="text-lg" />
              </div>
              <div className="w-9 h-9 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer duration-300 active:scale-90">
                <FaDeleteLeft className="text-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductComponent;
