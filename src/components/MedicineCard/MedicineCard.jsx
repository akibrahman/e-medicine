"use client";
import { AuthContext } from "@/app/providers/ContextProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";

const MedicineCard = ({ medicine }) => {
  const { carts, addToCart, showCart, setShowCart } = useContext(AuthContext);
  const [variantIndex, setVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState([false, ""]);
  return (
    <div
      onMouseEnter={() => setIsHovered([true, medicine.name])}
      onMouseLeave={() => setIsHovered([false, ""])}
      className="shadow-xl p-3 rounded-md"
    >
      <div
        className={`relative rounded-md after:duration-200 ease-linear after:w-full after:bg-[rgba(0,0,0,0.5)] after:absolute after:top-0 after:rounded-t-md ${
          isHovered[0] && isHovered[1] == medicine.name
            ? "after:h-full"
            : "after:h-0"
        }`}
      >
        <Image
          src={medicine.photoUrl}
          alt={medicine.name}
          width={150}
          height={150}
          className="aspect-video mx-auto"
        />
      </div>
      <div className="relative">
        <div
          className={`absolute text-white font-medium p-3 rounded-b-md top-0 w-full z-10 bg-[#353535] duration-200 ease-linear ${
            isHovered[0] && isHovered[1] == medicine.name
              ? "h-full opacity-100"
              : "h-0 opacity-0"
          }`}
        >
          <p className="border-b">{medicine.name}</p>
          <div className="text-sm flex items-center justify-between px-2 py-1.5 mt-2 bg-white rounded-md text-black">
            <p className="font-medium">{medicine.type}</p>
            <p className="text-red-500 text-xs">
              {medicine.variants[variantIndex].mg}
            </p>
          </div>
          <div className="text-sm flex flex-col items-center justify-center p-1 mt-2 bg-white rounded-md text-black custom-scrollbar">
            {medicine.variants.map((variant, i) => (
              <p
                onClick={() => setVariantIndex(i)}
                className="p-0.5 border-b pb-0.5 w-full border-stone-400 text-center hover:bg-blue-300"
                key={i}
              >
                {variant.mg}
              </p>
            ))}
          </div>
          <Link
            href={`/product/${medicine._id}`}
            className="border border-primary w-full text-center font-medium py-1 rounded-lg duration-200 active:scale-90 my-2 inline-block text-white"
          >
            View Details
          </Link>

          {medicine.stock == 0 ? (
            <button className="bg-orange-500 w-full text-center text-white font-medium py-1 rounded-lg duration-200 active:scale-90 cursor-none pointer-events-none">
              Stock Out
            </button>
          ) : carts.find((cart) => cart._id == medicine._id) ? (
            <button
              onClick={() => setShowCart(!showCart)}
              className="bg-green-500 w-full text-center text-white font-medium py-1 rounded-lg duration-200 active:scale-90"
            >
              View Cart
            </button>
          ) : (
            <button
              onClick={() =>
                addToCart({
                  ...medicine,
                  count: 1,
                  variants: { ...medicine.variants[variantIndex] },
                })
              }
              className="bg-primary w-full text-center text-white font-medium py-1 rounded-lg duration-200 active:scale-90 mb-2"
            >
              Add to Cart
            </button>
          )}
        </div>
        <div className="flex items-center justify-between py-4">
          <p className="font-semibold">{medicine.name}</p>
          <p className="text-sm text-[#999999]">{medicine.type}</p>
        </div>
        <p className="my-4 text-[#1F8548] text-sm max-h-10 overflow-y-scroll custom-scrollbar">
          {medicine.description}
        </p>
        <p className="mb-4 text-[#999999] text-sm font-semibold">
          {medicine.company_name}
        </p>
        <div className="mb-4 flex items-center gap-1 text-[#999999] text-sm">
          <p>{medicine.amount_per_strip}</p>
          <p>{medicine.type}</p>
          <p>(1 Strip)</p>
        </div>
        <div className="flex items-center justify-between my-4">
          <p className="text-lg font-semibold">
            ৳ {medicine.variants[variantIndex].discounted_price}
          </p>
          <p className="font-medium text-sm text-[#999999]">
            <del>৳ {medicine.variants[variantIndex].regular_price}</del>
          </p>
          <p className="text-sm text-red-500">
            {(
              ((medicine.variants[variantIndex].regular_price -
                medicine.variants[variantIndex].discounted_price) /
                medicine.variants[variantIndex].regular_price) *
              100
            ).toFixed(2)}{" "}
            % OFF
          </p>
        </div>
        {medicine.stock == 0 ? (
          <button className="bg-orange-500 w-full text-center text-white font-medium py-1 rounded-lg duration-200 active:scale-90 cursor-none pointer-events-none">
            Stock Out
          </button>
        ) : carts.find((cart) => cart._id == medicine._id) ? (
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-green-500 w-full text-center text-white font-medium py-1 rounded-lg duration-200 active:scale-90"
          >
            View Cart
          </button>
        ) : (
          <button
            onClick={() =>
              addToCart({
                ...medicine,
                count: 1,
                variants: { ...medicine.variants[variantIndex] },
              })
            }
            className="bg-primary w-full text-center text-white font-medium py-1 rounded-lg duration-200 active:scale-90"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default MedicineCard;
