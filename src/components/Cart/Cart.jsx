"use client";
import { AuthContext } from "@/app/providers/ContextProvider";
import React, { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";

const Cart = () => {
  const { carts } = useContext(AuthContext);

  const totalItem = carts.reduce((a, c) => a + parseInt(c.count), 0);
  const totalPrice = carts.reduce(
    (a, c) => a + parseInt(c.variants.discounted_price) * parseInt(c.count),
    0
  );
  return (
    <>
      <div className="fixed right-0 top-1/2 -translate-y-1/2 text-white z-50 cursor-pointer duration-300 active:scale-90">
        <div className="bg-primary px-5 py-3 rounded-tl flex flex-col items-center justify-center gap-2 border-b">
          <FaCartPlus className="text-3xl text-center" />
          <p className="font-medium text-xs text-center">{totalItem} Items</p>
        </div>
        <div className="p-1 rounded-bl bg-red-500 text-xs text-center">
          <p>৳ {totalPrice}</p>
        </div>
      </div>
      {/* <div className="fixed right-0 top-1/2 -translate-y-1/2 text-white z-50 min-w-10 h-[90vh] bg-primary"></div> */}
    </>
  );
};

export default Cart;
