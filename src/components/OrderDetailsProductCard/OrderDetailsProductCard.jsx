"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";
import Loader from "../Loader/Loader";

const OrderDetailsProductCard = ({ id, count, mg }) => {
  const { data: product } = useQuery({
    queryKey: ["order details card", id],
    queryFn: async ({ queryKey }) => {
      try {
        const { data } = await axios.get(`/api/product?id=${queryKey[1]}`);
        if (data.success) return data.products[0];
        else return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });
  if (!product) return <Loader />;
  return (
    <div className="flex flex-col items-center gap-1 bg-secondary rounded-md p-3 text-primary">
      <Image
        src={product.photoUrl}
        alt={product.name}
        height={80}
        width={80}
        className="aspect-square rounded-md"
      />
      <p>{product.name}</p>
      <p>
        {mg} - Qty: {count}
      </p>
    </div>
  );
};

export default OrderDetailsProductCard;
