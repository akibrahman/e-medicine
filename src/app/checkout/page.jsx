"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
  MdDeleteOutline,
  MdKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdPayment,
} from "react-icons/md";
import { TbCoinTaka } from "react-icons/tb";
import { AuthContext } from "../providers/ContextProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import Swal from "sweetalert2";
import Loader from "@/components/Loader/Loader";

const CheckoutPage = () => {
  const route = useRouter();
  const [ordering, setOrdering] = useState(false);
  const { carts, user, loading, clearCart } = useContext(AuthContext) || {};
  const totalItem = carts.reduce((a, c) => a + parseInt(c.count), 0);
  const totalPrice = parseInt(
    carts.reduce(
      (a, c) => a + parseInt(c.variants.discounted_price) * parseInt(c.count),
      0
    )
  );
  const totalRegularPrice = parseInt(
    carts.reduce(
      (a, c) => a + parseInt(c.variants.regular_price) * parseInt(c.count),
      0
    )
  );
  const totalSavings = totalRegularPrice - totalPrice;
  console.log(carts);

  const [checkoutData, setCheckoutData] = useState({
    name: "",
    address: "",
    phone: "",
    carts,
    paymentMethode: "",
  });

  useEffect(() => {
    setCheckoutData((prevProduct) => ({
      ...prevProduct,
      carts,
    }));
  }, [carts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const proceed = async () => {
    console.log(checkoutData);
    if (!checkoutData.carts) return;
    if (!checkoutData.name || !checkoutData.phone || !checkoutData.address)
      return toast.info("Give all information");
    if (!checkoutData.paymentMethode)
      return toast.info("Select payment methode");

    try {
      setOrdering(true);
      const { data } = await axios.post("/api/checkout", {
        ...checkoutData,
        status: "pending",
        createdAt: new Date().toISOString(),
        userId: user._id,
        totalRegularPrice,
        totalDiscount: totalSavings,
        totalPrice,
      });
      if (data.success) {
        Swal.fire({
          title: "Congrats !",
          text: "Your order is placed successfully",
          imageUrl: "/tick.png",
          imageWidth: 250,
          imageHeight: 250,
          imageAlt: "Order placed image",
        });
        clearCart();
        route.push("/");
      } else {
        toast.error("Server error, Try again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error, Try again!");
    } finally {
      setOrdering(false);
    }
  };

  if (loading) return <Loader />;
  if (!user) return route.push("/");
  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-primary mb-4">Checkout</h1>

        {/* Order Summary */}
        <div className="grid grid-cols-2 gap-4">
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
                    readOnly
                    type="text"
                    name="qty"
                    id="qty"
                    value={cart.count}
                    className="w-[40px] px-2 py-0.5 rounded bg-secondary outline-none text-primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary my-8">
            Shipping Information
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                onChange={handleChange}
                name="name"
                value={checkoutData.name}
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-pribg-primary sm:text-sm"
                placeholder="John Doe"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                onChange={handleChange}
                name="address"
                value={checkoutData.address}
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-pribg-primary sm:text-sm"
                placeholder="123 Street, Dhaka"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                onChange={handleChange}
                name="phone"
                value={checkoutData.phone}
                type="tel"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-pribg-primary sm:text-sm"
                placeholder="+880 1234 567890"
              />
            </div>
          </form>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Payment Method
          </h2>
          <div className="flex items-center mb-4 cursor-pointer">
            <input
              type="radio"
              id="cod"
              name="payment"
              className="text-primary focus:ring-primary"
              onChange={() => {
                console.log("Bkash");
                setCheckoutData((prevProduct) => ({
                  ...prevProduct,
                  paymentMethode: "cod",
                }));
              }}
            />
            <label
              htmlFor="cod"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Cash on Delivery
            </label>
          </div>
          <div className="flex items-center cursor-pointer">
            <input
              onChange={() => {
                console.log("Bkash");
                setCheckoutData((prevProduct) => ({
                  ...prevProduct,
                  paymentMethode: "ssl",
                }));
              }}
              type="radio"
              id="bkash"
              name="payment"
              className="text-primary focus:ring-primary"
            />
            <label
              htmlFor="bkash"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              bKash
            </label>
          </div>
        </div>

        {/* Order Confirmation */}
        <div className="flex justify-between items-center">
          <button
            disabled={ordering}
            onClick={proceed}
            className="bg-primary duration-300 hover:scale-105 active:scale-90 text-white font-semibold py-2 px-4 rounded shadow hover:bg-primary text-sm"
          >
            {ordering ? (
              <CgSpinner className="text-xl animate-spin" />
            ) : (
              <>
                <MdPayment className="inline-block mr-2" />
                Confirm Order
              </>
            )}
          </button>
          <button className="bg-red-500 duration-300 hover:scale-105 active:scale-90 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600 text-sm">
            <FaShoppingCart className="inline-block mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
