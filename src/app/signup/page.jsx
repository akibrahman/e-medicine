"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  //   const { userRefetch } = useContext(AuthContext);
  //   const route = useRouter();
  //   const searchParams = useSearchParams();
  //   const callbackUrl = searchParams.get("callbackUrl");
  //   const email = useRef();
  //   const [loading, setLoading] = useState(false);
  //   const [loading2, setLoading2] = useState(false);
  //   const [passShown, setPassShown] = useState(false);
  //   const [formData, setFormData] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   const handleChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     console.log("Form submitted:", formData);
  //     setLoading(true);
  //     try {
  //       const res = await axios.post("/api/users/login", formData);
  //       console.log(res);
  //       if (res.data.success && res.data.code === 2121) {
  //         await userRefetch();
  //         route.push(callbackUrl || "/dashboard");
  //         toast.success(res.data.msg);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       if (error.response.data.code === 2002) {
  //         toast.error(error.response.data.msg);
  //       }
  //       if (error.response.data.code === 2003) {
  //         toast.error(error.response.data.msg);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className="min-h-[calc(100vh-84px)] flex items-center justify-center bg-gradient-to-r from-primary to-transparent px-5">
      <div className="bg-gradient-to-l from-primary to-transparent p-8 rounded w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">Sign Up</h2>
        <form
        // onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block dark:text-white text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              //   ref={email}
              type="email"
              id="email"
              name="email"
              //   value={formData.email}
              //   onChange={handleChange}
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
                // type={passShown ? "text" : "password"}
                id="password"
                name="password"
                // value={formData.password}
                // onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded text-black outline-none relative"
                required
              />
              {
                // !passShown
                true ? (
                  <FaEye
                    //   onClick={() => setPassShown(!passShown)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer duration-300 active:scale-90"
                  />
                ) : (
                  <FaEyeSlash
                    //   onClick={() => setPassShown(!passShown)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer duration-300 active:scale-90"
                  />
                )
              }
            </div>
          </div>

          <button
            type="submit"
            className="bg-sky-500 text-white p-2 w-full rounded hover:bg-sky-600 transition duration-300"
          >
            {false ? (
              // loading
              <CgSpinner className="animate-spin text-2xl text-center mx-auto" />
            ) : (
              "Login"
            )}
          </button>
          <div className="mt-4 flex items-center justify-between">
            <Link href={"/login"}>
              <span className="text-white">Or,</span>{" "}
              <span className="text-white font-semibold underline">
                Login
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
