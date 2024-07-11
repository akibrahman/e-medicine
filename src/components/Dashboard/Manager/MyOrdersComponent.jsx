import Loader from "@/components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Modal from "react-modal";
import Link from "next/link";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaDeleteLeft, FaPencil } from "react-icons/fa6";
import { toast } from "react-toastify";
import { set } from "mongoose";
import OrderDetailsProductCard from "@/components/OrderDetailsProductCard/OrderDetailsProductCard";
import Swal from "sweetalert2";
import Pagination from "@/utils/Pagination";
import { convertCamelCaseToCapitalized } from "@/utils/camelToCapitalize";

const MyOrdersComponent = ({ user }) => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const { data: orders, refetch } = useQuery({
    queryKey: ["orders", "manager dashboard", page, user?._id],
    queryFn: async ({ queryKey }) => {
      try {
        const { data } = await axios.get(
          `/api/order?page=${queryKey[2]}&userId=${queryKey[3]}`
        );
        if (data.success) {
          setCount(data.count);
          return data.orders;
        } else return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    enabled: user && user._id ? true : false,
  });

  console.log(count);

  const [loading, setLoading] = useState([false, ""]);

  // const deleteProduct = async (id) => {
  //   const confirmed = confirm("Do you want to delete this product");
  //   if (confirmed) {
  //     setLoading([true, id]);
  //     try {
  //       const { data } = await axios.delete(`/api/product?id=${id}`);
  //       if (data.success) {
  //         await refetch();
  //         toast.success("Product deleted successfully");
  //       } else {
  //         toast.error("Server error, Try again!");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.response.data.msg || "Server error, Try again!");
  //     } finally {
  //       setLoading([false, ""]);
  //     }
  //   }
  // };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#0E7673",
      border: "0px solid #EAB308",
      color: "#fff",
      padding: "30px",
      //   width: "90%",
      // overflow: "scroll",
      // height: "90%",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setmodalData] = useState(null);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setmodalData(null);
  };

  const getOrderDetails = async (id) => {
    setIsOpen(false);
    setmodalData(null);
    try {
      const { data } = await axios.get(`/api/order?id=${id}`);
      if (data.success) {
        setmodalData(data.orders[0]);
        openModal();
        ``;
      } else {
        toast.error("Server error, Try again!");
        setIsOpen(false);
        setmodalData(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error, Try again!");
      setIsOpen(false);
      setmodalData(null);
    }
  };

  const totalPages = Math.ceil(count / 5);
  const pages = [...new Array(totalPages ? totalPages : 0).fill(0)];

  if (!orders) return <Loader />;
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {modalData ? (
          <div className="">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Customer Information</h3>
                <p>
                  <strong>Name:</strong> {modalData.name}
                </p>
                <p>
                  <strong>Phone:</strong> {modalData.phone}
                </p>
                <p>
                  <strong>Address:</strong> {modalData.address}
                </p>
                <p>
                  <strong>Email:</strong> {modalData.user.email}
                </p>
              </div>
              <div className="">
                <h3 className="text-lg font-semibold">Order Information</h3>
                <div className="py-3">
                  <strong>Status:</strong>
                  <span className="ml-2">
                    {convertCamelCaseToCapitalized(modalData.status)}
                  </span>
                </div>

                <div className="">
                  <strong>Paid:</strong>
                  <span className="ml-2">
                    {convertCamelCaseToCapitalized(
                      modalData.paid ? "paid" : "due"
                    )}
                  </span>
                </div>
                <p>
                  <strong>Payment Method:</strong> {modalData.paymentMethode}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(modalData.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total Regular Price:</strong> ৳{" "}
                  {modalData.totalRegularPrice}
                </p>
                <p>
                  <strong>Discount:</strong> ৳ {modalData.totalDiscount}
                </p>
                <p>
                  <strong>Total Price:</strong> ৳ {modalData.totalPrice}
                </p>
              </div>
            </div>
            <h3 className="text-lg font-semibold">Cart Items</h3>
            <div className="mb-4 flex items-center gap-2 flex-wrap">
              {modalData.carts.map((item, index) => (
                <OrderDetailsProductCard
                  id={item.id}
                  mg={item.mg}
                  count={item.count}
                  key={item.id}
                />
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </Modal>
      <div className="p-4">
        <p className="text-primary text-center underline text-xl">
          Orders Management Section
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between px-3 py-2 bg-primary font-medium text-white rounded">
            <p className="md:w-[12%] text-center">Image</p>
            <p className="md:w-[12%] text-center">Name</p>
            <p className="md:w-[12%] text-center">Qty</p>
            <p className="md:w-[12%] text-center">Status</p>
            <p className="md:w-[10%] text-center">payment</p>
            <p className="md:w-[20%] text-center">Address</p>
            <p className="md:w-[10%] text-center">Phone</p>
            <p className="md:w-[12%] text-center">Action</p>
          </div>
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between px-3 py-2 text-primary font-medium shadow shadow-primary rounded"
            >
              <div className="md:w-[12%] flex items-center justify-center">
                <Image
                  src={order.user.photo}
                  alt={order.user.name}
                  height={40}
                  width={40}
                  className="aspect-square rounded-full mx-auto"
                />
              </div>
              <p className="md:w-[12%] text-center">{order.user.name}</p>
              <p className="md:w-[12%] text-center">{order.carts.length}</p>
              <p className="md:w-[12%] text-center">{order.status}</p>
              <p className="md:w-[10%] text-center">
                {order.paid ? "Paid" : "Due"}
              </p>
              <p className="md:w-[20%] text-center">{order.address}</p>
              <p className="md:w-[10%] text-center">{order.phone}</p>
              <div className="flex items-center justify-center gap-2 md:w-[12%]">
                <button
                  onClick={() => getOrderDetails(order._id)}
                  className="px-3 py-1 rounded bg-primary text-white font-semibold text-sm duration-300 active:scale-90"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          pages={pages}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default MyOrdersComponent;
