"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const EditProduct = ({ params }) => {
  const { id } = params;
  const { data: productDB } = useQuery({
    queryKey: ["edit-product", id],
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
  const { data: categories } = useQuery({
    queryKey: ["Categories for add product"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/category");
        if (data.success) {
          let categories = data.categories
            .filter((category) => category.subs.length == 0)
            .map((category) => category.title);

          let subcategories = data.categories
            .filter((category) => category.subs.length > 0)
            .flatMap((category) => category.subs.map((sub) => sub.title));
          return [...categories, ...subcategories];
        } else return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });

  const [product, setProduct] = useState(
    productDB || {
      name: "",
      type: "",
      description: "",
      company_name: "",
      amount_per_strip: "",
      category: "",
      variants: [{ mg: "", regular_price: "", discounted_price: "" }],
    }
  );
  const [url, setUrl] = useState(productDB?.photoUrl || null);

  useEffect(() => {
    setProduct(
      productDB || {
        name: "",
        type: "",
        description: "",
        company_name: "",
        amount_per_strip: "",
        category: "",
        variants: [{ mg: "", regular_price: "", discounted_price: "" }],
      }
    );
    setUrl(productDB?.photoUrl || null);
  }, [productDB]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...product.variants];
    newVariants[index][name] = value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      variants: newVariants,
    }));
  };

  const addVariant = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      variants: [
        ...prevProduct.variants,
        { mg: "", regular_price: "", discounted_price: "" },
      ],
    }));
  };

  const removeVariant = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      variants: prevProduct.variants.filter((_, i) => i !== index),
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.variants.length === 0)
      return toast.info("At least one variant should be added !");

    for (let i = 0; i < product.variants.length; i++) {
      const variant = product.variants[i];
      if (!variant.mg || !variant.regular_price || !variant.discounted_price) {
        return toast.info("All fields in variants must be filled out !");
      }
    }
    try {
      setLoading(true);
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("product", JSON.stringify(product));
      const { data } = await axios.put("/api/product", formData);
      if (data.success) {
        setFile(null);
        toast.success("Product updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Server error, Try again!");
    } finally {
      setLoading(false);
    }
  };

  const [file, setFile] = useState(null);

  if (!categories) return;
  if (!productDB) return;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded my-10 text-primary relative"
    >
      <div className="mb-6 flex items-center gap-3">
      <Link
        href="/dashboard?displayData=allProduct"
        className="w-10 h-10 flex items-center justify-center text-white bg-primary rounded-full duration-300 active:scale-90 hover:scale-105 cursor-pointer"
      >
        <FaArrowLeft className="text-lg" />
      </Link>
      <h2 className="text-2xl font-bold">Update Product</h2>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="photo" className="block text-gray-700">
          Photo URL:
        </label>
        <label
          htmlFor="photo"
          className="p-5 rounded border-dotted border-primary border cursor-pointer flex items-center justify-center"
        >
          {!url && <FaPlus className="text-lg text-primary" />}
          {url && (
            <Image
              width={200}
              height={150}
              className="rounded aspect-square"
              alt="New added product"
              src={url}
            />
          )}
        </label>
        <input
          type="file"
          id="photo"
          // value={product.photoUrl}
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              const photoUrl = URL.createObjectURL(file);
              setUrl(photoUrl);
              setFile(file);
            }
          }}
          hidden
          className="mt-1 p-2 w-full border rounded outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Type:</label>
        <input
          type="text"
          name="type"
          value={product.type}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded outline-none"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Company Name:</label>
        <input
          type="text"
          name="company_name"
          value={product.company_name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Amount per Strip:</label>
        <input
          type="text"
          name="amount_per_strip"
          value={product.amount_per_strip}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Category:</label>
        <select
          onChange={handleChange}
          value={product.category}
          name="category"
          className="mt-1 p-2 w-full border rounded outline-none"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category, i) => (
            <option value={category} key={i}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Variants:</label>
        {product.variants.map((variant, index) => (
          <div key={index} className="mb-2 p-2 border rounded bg-secondary">
            <div className="mb-2">
              <label className="block text-gray-700">mg/ml:</label>
              <input
                type="text"
                name="mg"
                value={variant.mg}
                onChange={(e) => handleVariantChange(index, e)}
                className="mt-1 p-2 w-full border rounded outline-none"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Regular Price:</label>
              <input
                type="text"
                name="regular_price"
                value={variant.regular_price}
                onChange={(e) => handleVariantChange(index, e)}
                className="mt-1 p-2 w-full border rounded outline-none"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Discounted Price:</label>
              <input
                type="text"
                name="discounted_price"
                value={variant.discounted_price}
                onChange={(e) => handleVariantChange(index, e)}
                className="mt-1 p-2 w-full border rounded outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Remove Variant
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addVariant}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Variant
        </button>
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded flex items-center justify-center duration-300 active:scale-90 hover:scale-105 mx-auto"
      >
        {loading ? <CgSpinner className="text-xl animate-spin" /> : "Update"}
      </button>
    </form>
  );
};

export default EditProduct;
