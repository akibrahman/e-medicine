"use client";
import { AuthContext } from "@/app/providers/ContextProvider";
import React, { useContext, useState } from "react";

const AddToCartDetailsButton = ({ id, variants, product = {} }) => {
  const { addToCart } = useContext(AuthContext);
  const [selectedVariant, setSelectedVariant] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">Variants</h3>
        <div className="mt-2 flex items-center gap-3">
          {variants.map((variant, index) => (
            <div
              onClick={() => setSelectedVariant(index)}
              key={index}
              className={`p-4 rounded-md cursor-pointer duration-300 ${
                selectedVariant == index
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <p className="text-sm">
                <span className="font-semibold">Strength:</span> {variant.mg}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Regular Price:</span>{" "}
                {variant.regular_price} BDT
              </p>
              <p className="text-sm">
                <span className="font-semibold">Discounted Price:</span>{" "}
                {variant.discounted_price} BDT
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() =>
          addToCart({
            ...product,
            count: 1,
            variants: { ...product.variants[selectedVariant] },
          })
        }
        className="bg-primary w-max text-center text-white font-medium py-2 px-5 my-4 rounded duration-200 active:scale-90 mb-2 mx-auto inline-block"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartDetailsButton;
