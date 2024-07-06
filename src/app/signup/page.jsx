"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const SignUp = () => {
  //   const { userRefetch } = useContext(AuthContext);
  const route = useRouter();
  //   const searchParams = useSearchParams();
  //   const callbackUrl = searchParams.get("callbackUrl");
  //   const email = useRef();
  const [loading, setLoading] = useState(false);
  //   const [loading2, setLoading2] = useState(false);
  const [passShown, setPassShown] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      toast.info("Submit your profile picture");
      return;
    }
    const fullFormData = new FormData();
    fullFormData.set("file", formData.file);
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        fullFormData.append(key, formData[key]);
      }
    }
    console.log("Form submitted:", formData);
    setLoading(true);
    try {
      const res = await axios.post("/api/user", fullFormData);
      console.log(res.data);
      route.push("/");
      toast.success("Sign up successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-84px)] flex items-center justify-center bg-white px-5 my-5">
      <div className="bg-primary p-8 rounded w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block dark:text-white text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded text-black outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block dark:text-white text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded text-black outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block dark:text-white text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passShown ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded text-black outline-none relative select-none"
                required
              />
              {!passShown ? (
                <FaEye
                  onClick={() => setPassShown(!passShown)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer duration-300 active:scale-90"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setPassShown(!passShown)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer duration-300 active:scale-90"
                />
              )}
            </div>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <label
              htmlFor="photo"
              className="block dark:text-white text-sm font-bold mb-2"
            >
              Your Photo
            </label>
            <label
              htmlFor="photo"
              className="w-12 h-12 rounded-full border-dotted inline-block border cursor-pointer"
            >
              <Image
                width={60}
                height={60}
                className="rounded-full aspect-square"
                alt="Profile picture for sign up"
                src={formData.selectedImage || "/no-photo.png"}
              />
            </label>
            <input
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              //   value={formData.name}
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  const photoUrl = URL.createObjectURL(file);
                  setFormData({
                    ...formData,
                    selectedImage: photoUrl,
                    file,
                  });
                }
              }}
              hidden
            />
          </div>

          <button
            type="submit"
            className="bg-sky-500 text-white p-2 w-full rounded hover:bg-sky-600 transition duration-300"
          >
            {loading ? (
              <CgSpinner className="animate-spin text-2xl text-center mx-auto" />
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="mt-4 flex items-center justify-between">
            <Link href={"/login"}>
              <span className="text-white">Already Signed Up?</span>{" "}
              <span className="text-white font-semibold underline">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
