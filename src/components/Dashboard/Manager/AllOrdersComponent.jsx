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

const AllOrdersComponent = () => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const { data: orders, refetch } = useQuery({
    queryKey: ["orders", "manager dashboard", page],
    queryFn: async ({queryKey}) => {
      try {
        const { data } = await axios.get(`/api/order?page=${queryKey[2]}`);
        if (data.success) {
          setCount(data.count);
          return data.orders;
        } else return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });

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

  const statusChanged = async (id, prevStatus, newStatus) => {
    console.log(id, prevStatus, newStatus);
    Swal.fire({
      title: "Changing order status",
      text: `Do you on to change the status of this order from ${prevStatus} to ${newStatus} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.put("/api/order", {
            id,
            newStatus,
            target: "status",
          });
          if (data.success) {
            await refetch();
            toast.success("Order status updated");
            closeModal();
            setmodalData(null);
          } else {
            await refetch();
            toast.error("Server error, Try again!");
            closeModal();
            setmodalData(null);
          }
        } catch (error) {
          console.log(error);
          await refetch();
          toast.error("Server error, Try again!");
          closeModal();
          setmodalData(null);
        }
      }
    });
  };

  const paymentChanged = async (id, prevPayment, newPayment) => {
    Swal.fire({
      title: "Changing payment status",
      text: `Do you on to change the paid status of this order from ${
        prevPayment ? "Paid" : "Due"
      } to ${prevPayment ? "Due" : "Paid"} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.put("/api/order", {
            id,
            newPayment,
            target: "payment",
          });
          if (data.success) {
            await refetch();
            toast.success("Order status updated");
            closeModal();
            setmodalData(null);
          } else {
            await refetch();
            toast.error("Server error, Try again!");
            closeModal();
            setmodalData(null);
          }
        } catch (error) {
          console.log(error);
          await refetch();
          toast.error("Server error, Try again!");
          closeModal();
          setmodalData(null);
        }
      }
    });
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
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Order Information</h3>
                <div className="py-3">
                  <strong>Status:</strong>
                  <select
                    onChange={(e) =>
                      statusChanged(
                        modalData._id,
                        modalData.status,
                        e.target.value
                      )
                    }
                    name=""
                    id=""
                    defaultValue={modalData.status}
                    className="outline-none text-primary rounded-md px-2 py-0.5 ml-1"
                  >
                    <option value="declined">Declined</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                <div className="py-3">
                  <strong>Paid:</strong>
                  <select
                    onChange={(e) =>
                      paymentChanged(
                        modalData._id,
                        modalData.paid,
                        e.target.value
                      )
                    }
                    name=""
                    id=""
                    defaultValue={modalData.paid}
                    className="outline-none text-primary rounded-md px-2 py-0.5 ml-1"
                  >
                    <option value="true">Paid</option>
                    <option value="false">Due</option>
                  </select>
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
          <div className="flex items-center justify-between px-3 py-2 bg-primary font-medium text-white rounded">
            <p className="w-[12%] text-center">Image</p>
            <p className="w-[12%] text-center">Name</p>
            <p className="w-[12%] text-center">Qty</p>
            <p className="w-[12%] text-center">Status</p>
            <p className="w-[10%] text-center">payment</p>
            <p className="w-[20%] text-center">Address</p>
            <p className="w-[10%] text-center">Phone</p>
            <p className="w-[12%] text-center">Action</p>
          </div>
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between px-3 py-2 text-primary font-medium shadow shadow-primary rounded"
            >
              <div className="w-[12%] flex items-center justify-center">
                <Image
                  src={order.user.photo}
                  alt={order.user.name}
                  height={40}
                  width={40}
                  className="aspect-square rounded-full mx-auto"
                />
              </div>
              <p className="w-[12%] text-center">{order.user.name}</p>
              <p className="w-[12%] text-center">{order.carts.length}</p>
              <p className="w-[12%] text-center">{order.status}</p>
              <p className="w-[10%] text-center">
                {order.paid ? "Paid" : "Due"}
              </p>
              <p className="w-[20%] text-center">{order.address}</p>
              <p className="w-[10%] text-center">{order.phone}</p>
              <div className="flex items-center justify-center gap-2 w-[12%]">
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

export default AllOrdersComponent;
