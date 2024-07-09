"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";

const DetailsMoreProducts = ({ category }) => {
  const route = useRouter();
  const { data: products } = useQuery({
    queryKey: ["products", "details page"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/product");
        if (data.success) {
          const sameProducts = data.products
            .filter((product) => product.category == category)
            .slice(0, 5);
          return sameProducts;
        } else return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });
  console.log(products);

  return (
    <div className="mt-5">
      <p className="font-semibold text-primary underline mb-2">
        More Relevent Medicines
      </p>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {products?.map((product) => (
          <SwiperSlide
            onClick={() => route.push(`/product/${product._id}`)}
            key={product._id}
          >
            <div className="flex flex-col items-center gap-3 bg-secondary p-4 rounded select-none cursor-pointer active:scale-90 duration-300 hover:bg-primary text-primary hover:text-white">
              <Image
                src={product.photoUrl}
                alt={product.name}
                height={100}
                width={100}
                className="aspect-square rounded"
              />
              <p className="font-semibold text-sm">{product.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DetailsMoreProducts;
