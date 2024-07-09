"use client";
import axios from "axios";
import Image from "next/image";
import { VscGraphLine } from "react-icons/vsc";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { TbBrandBooking, TbBrandShopee } from "react-icons/tb";
import { CgCalendarDates, CgProfile, CgSpinner } from "react-icons/cg";
import {
  FaAddressCard,
  FaFile,
  FaFileInvoiceDollar,
  FaSms,
  FaUsers,
} from "react-icons/fa";
import { TbCoinTaka } from "react-icons/tb";
import { GrUserManager } from "react-icons/gr";
import { GiHotMeal } from "react-icons/gi";
import { FaBagShopping, FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdNoMeals, MdOutlineUpdate } from "react-icons/md";
import moment from "moment";
import SuperAdminProfileComponent from "./Manager/SuperAdminProfileComponent";
import { AuthContext } from "@/app/providers/ContextProvider";
import ManageCategoriesComponent from "./Manager/ManageCategoriesComponent";
import AddProductComponent from "./Manager/AddProductComponent";
import AllProductComponent from "./Manager/AllProductComponent";

const Dashboard = ({ user }) => {
  const route = useRouter();
  const searchParams = useSearchParams();
  let displayData = searchParams.get("displayData");

  // if (!displayData) {
  //   user.role == "admin"||user.role == "super-admin"
  //     ? (displayData = "managerProfile")
  //     : (displayData = "profile");
  // }
  // if (displayData) {
  //   if (
  //     (displayData == "profile" ||
  //       displayData == "myBills" ||
  //       displayData == "mealHistory" ||
  //       displayData == "currentMonth" ||
  //       displayData == "managerDetails") &&
  //     user.role == "manager"
  //   ) {
  //     displayData = "managerProfile";
  //   } else if (
  //     (displayData == "managerAllUsers" ||
  //       displayData == "managerMarketDetails" ||
  //       displayData == "managerOrderStatus" ||
  //       displayData == "managerSendSMS" ||
  //       displayData == "managerBillQuery" ||
  //       displayData == "managerMealQuery" ||
  //       displayData == "managerMarketQuery" ||
  //       displayData == "managerMealUpdator" ||
  //       displayData == "managerRFIDIssue" ||
  //       displayData == "managerAllBookings" ||
  //       displayData == "managerManualInvouce" ||
  //       displayData == "mealChangeRequests") &&
  //     user.role == "client"
  //   ) {
  //     displayData = "profile";
  //   }
  // }

  const { userRefetch } = useContext(AuthContext);
  const [profileBarShown, setProfileBarShown] = useState(false);
  const [sideBarShown, setSideBarShown] = useState(false);
  // const [displayData, setDisplayData] = useState("profile");

  const [loggingOut, setLoggingOut] = useState(false);
  const logout = async () => {
    setLoggingOut(true);
    try {
      const { data } = await axios.get("/api/users/logout");
      if (data.success) {
        await userRefetch();
        route.push("/signin");
        toast.success(data.msg);
      }
    } catch (error) {
      toast.error("Something went Wrong !");
      console.log(error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="relative">
      <nav className="w-full border-b bg-gray-800 border-gray-700">
        <div className="px-3 py-1 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => setSideBarShown(!sideBarShown)}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link href="/" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                  Dashboard
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-130px)]">
        <aside
          id="logo-sidebar"
          className={`absolute md:relative h-[calc(100vh-130px)] py-10 transition-transform border-r border-gray-700 ${
            sideBarShown
              ? "w-72 md:w-72 bg-opacity-95 md:bg-opacity-100 bg-gray-800"
              : "w-0 md:w-72 md:bg-gray-800"
          }`}
        >
          <div
            className={`h-full pb-4 overflow-y-auto bg-gray800 ${
              sideBarShown ? "px-3 md:px-3" : "px-0 md:px-3"
            }`}
          >
            <ul className="font-medium flex flex-col gap-2">
              {user && user.role == "super-admin" && (
                <>
                  <Link
                    onClick={() => setSideBarShown(false)}
                    href="/dashboard?displayData=superAdminProfile"
                  >
                    <div
                      className={`flex items-center p-2 rounded-lg text-white group select-none cursor-pointer ${
                        displayData == "superAdminProfile"
                          ? "bg-gray-700"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      <CgProfile
                        className={`text-gray-400 md:text-xl ${
                          displayData == "superAdminProfile"
                            ? "text-white"
                            : "group-hover:text-white"
                        }`}
                      />
                      <span className="ms-3 text-sm md:text-base">
                        Admin Profile
                      </span>
                    </div>
                  </Link>
                  <Link
                    onClick={() => setSideBarShown(false)}
                    href="/dashboard?displayData=categories"
                  >
                    <div
                      className={`flex items-center p-2 rounded-lg text-white group select-none cursor-pointer ${
                        displayData == "categories"
                          ? "bg-gray-700"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      <CgProfile
                        className={`text-gray-400 md:text-xl ${
                          displayData == "categories"
                            ? "text-white"
                            : "group-hover:text-white"
                        }`}
                      />
                      <span className="ms-3 text-sm md:text-base">
                        Manage Categories
                      </span>
                    </div>
                  </Link>
                  <Link
                    onClick={() => setSideBarShown(false)}
                    href="/dashboard?displayData=addProduct"
                  >
                    <div
                      className={`flex items-center p-2 rounded-lg text-white group select-none cursor-pointer ${
                        displayData == "addProduct"
                          ? "bg-gray-700"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      <CgProfile
                        className={`text-gray-400 md:text-xl ${
                          displayData == "addProduct"
                            ? "text-white"
                            : "group-hover:text-white"
                        }`}
                      />
                      <span className="ms-3 text-sm md:text-base">
                        Add Products
                      </span>
                    </div>
                  </Link>
                  <Link
                    onClick={() => setSideBarShown(false)}
                    href="/dashboard?displayData=allProduct"
                  >
                    <div
                      className={`flex items-center p-2 rounded-lg text-white group select-none cursor-pointer ${
                        displayData == "allProduct"
                          ? "bg-gray-700"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      <CgProfile
                        className={`text-gray-400 md:text-xl ${
                          displayData == "allProduct"
                            ? "text-white"
                            : "group-hover:text-white"
                        }`}
                      />
                      <span className="ms-3 text-sm md:text-base">
                        All Products
                      </span>
                    </div>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </aside>

        <div className="w-full overflow-y-scroll">
          {
            // For User -----------------------------------
            displayData == "superAdminProfile" ? (
              <SuperAdminProfileComponent user={user} />
            ) : displayData == "categories" ? (
              <ManageCategoriesComponent user={user} />
            ) : displayData == "addProduct" ? (
              <AddProductComponent />
            ) : displayData == "allProduct" ? (
              <AllProductComponent />
            ) : null
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
