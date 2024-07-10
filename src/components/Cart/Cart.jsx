"use client";
import { AuthContext } from "@/app/providers/ContextProvider";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaCartPlus, FaTimes } from "react-icons/fa";
import {
  MdDeleteOutline,
  MdKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { PiArrowSquareOut } from "react-icons/pi";
import { TbCoinTaka } from "react-icons/tb";

const Cart = () => {
  const {
    carts = [],
    removeItemFromCart = () => {},
    updateItemCount = () => {},
  } = useContext(AuthContext) || {};

  const [showCart, setShowCart] = useState(false);

  const totalItem = carts.reduce((a, c) => a + parseInt(c.count), 0);
  const totalPrice = carts.reduce(
    (a, c) => a + parseInt(c.variants.discounted_price) * parseInt(c.count),
    0
  );
  const totalRegularPrice = carts.reduce(
    (a, c) => a + parseInt(c.variants.regular_price) * parseInt(c.count),
    0
  );
  const totalSavings = totalRegularPrice - totalPrice;
  //---------------------------
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    // Initialize input values from carts state
    const initialInputValues = carts.reduce((acc, cart) => {
      acc[cart._id] = cart.count;
      return acc;
    }, {});
    setInputValues(initialInputValues);
  }, [carts]);

  const handleInputChange = (id, mg, value) => {
    const newCount = parseInt(value);
    setInputValues((prev) => ({ ...prev, [id]: newCount }));
    if (!isNaN(newCount) && newCount > 0) {
      updateItemCount(id, mg, newCount);
      updateItemCount(id, mg, value);
    }
  };
  return (
    <>
      <div
        onClick={() => setShowCart(true)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 text-white z-50 cursor-pointer duration-300 active:scale-90 ${
          showCart ? "hidden" : "block"
        }`}
      >
        <div className="bg-primary px-5 py-3 rounded-tl flex flex-col items-center justify-center gap-2 border-b">
          <FaCartPlus className="text-3xl text-center" />
          <p className="font-medium text-xs text-center">{totalItem} Items</p>
        </div>
        <div className="p-1 rounded-bl bg-red-500 text-xs text-center">
          <p>৳ {totalPrice}</p>
        </div>
      </div>
      <div
        className={`fixed right-0 top-1/2 -translate-y-1/2 text-primary shadow-lg shadow-primary bg-white z-50 min-w-10 rounded-md h-screen duration-300 ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between shadow-lg p-3 rounded-tl-md">
          <p>Shopping Cart</p>
          <FaTimes
            className="text-lg text-red-500 cursor-pointer"
            onClick={() => setShowCart(false)}
          />
        </div>
        <div className="p-3 flex flex-col items-center gap-3 overflow-y-scroll custom-scrollbar h-[310px]">
          {carts.map((cart) => (
            <div
              className="flex items-center gap-2 shadow-lg p-2"
              key={cart._id}
            >
              <div className="border rounded-md">
                <Image
                  src={cart.photoUrl}
                  alt={cart.name}
                  width={100}
                  height={100}
                  className="aspect-square"
                />
              </div>
              <div className="">
                <p
                  className={`font-semibold mb-3 ${
                    cart.name.length > 10 ? "text-xs" : "text-base"
                  }`}
                >
                  {cart.name}
                </p>
                <p className="mb-1 text-xs text-[#8D8D8D]">
                  {cart.variants.mg} - {cart.type}
                </p>
                <p className="mb-1 text-xs font-medium text-primary">
                  {cart.company_name}
                </p>
                <div className="mb-1 flex items-center gap-1 text-[#8D8D8D] text-xs">
                  <p>{cart.amount_per_strip}</p>
                  <p>{cart.type}</p>
                  <p>(1 Strip)</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <MdDeleteOutline
                  onClick={() => removeItemFromCart(cart._id, cart.variants.mg)}
                  className="text-red-500 hover:scale-105 duration-300 cursor-pointer text-xl"
                />
                <p className="flex items-center justify-center gap-3">
                  <span className="text-xs text-red-500">
                    {cart.variants.regular_price}
                  </span>
                  <span className="text-sm text-primary font-semibold">
                    ৳ {cart.variants.discounted_price}
                  </span>
                </p>
                <div className="border border-primary rounded-md p-1 flex items-center gap-1">
                  <p className="text-sm">Qty:</p>
                  <input
                    type="text"
                    name="qty"
                    id="qty"
                    value={inputValues[cart._id] || ""}
                    onChange={(e) =>
                      handleInputChange(
                        cart._id,
                        cart.variants.mg,
                        e.target.value
                      )
                    }
                    className="w-[40px] px-2 py-0.5 rounded bg-secondary outline-none"
                  />
                  <div className="flex flex-col items-center justify-center gap-0.5">
                    <MdKeyboardArrowUp
                      onClick={() => {
                        updateItemCount(
                          cart._id,
                          cart.variants.mg,
                          parseInt(cart.count) + 1
                        );
                      }}
                      className="hover:bg-secondary cursor-pointer text-lg"
                    />
                    <MdOutlineKeyboardArrowDown
                      onClick={() => {
                        updateItemCount(
                          cart._id,
                          cart.variants.mg,
                          parseInt(cart.count) - 1
                        );
                      }}
                      className="hover:bg-secondary cursor-pointer text-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bottom-0 absolute w-full p-3 rounded-md shadow bg-white">
          <div className="bg-secondary flex items-center font-semibold gap-2 w-full p-3 rounded-md border border-dashed border-primary">
            <TbCoinTaka className="text-red-500" />
            <p className="text-sm text-primary">
              You are saving ৳{totalSavings} in this order
            </p>
          </div>
          <div className="flex items-center justify-between w-full px-6 py-4 text-sm text-black font-semibold">
            <p>MRP Total</p>
            <p>৳{totalRegularPrice}</p>
          </div>
          <div className="flex items-center justify-between w-full px-6 pb-4 pt-0 text-sm text-black font-semibold">
            <p>Discount</p>
            <p className="text-red-500">- ৳{totalSavings}</p>
          </div>
          <hr className="border border-dashed" />
          <div className="flex items-center justify-between w-full px-6 pb-4 pt-2 text-sm text-black font-semibold">
            <p>Total Amount</p>
            <p className="">৳{totalPrice}</p>
          </div>

          <div className="bg-primary text-white font-semibold rounded-md px-4 py-2 flex items-center justify-between cursor-pointer duration-300 active:scale-90">
            <p className="text-sm">Proceed to Checkout</p>
            <PiArrowSquareOut className="text-xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
