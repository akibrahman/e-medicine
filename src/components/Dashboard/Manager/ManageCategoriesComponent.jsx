import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ManagerAddCategoryComponent from "./ManagerAddCategoryComponent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import ManagerEditCategoryComponent from "./ManagerEditCategoryComponent";

const ManageCategoriesComponent = ({ user }) => {
  const { data: categories, refetch: refetchCategories } = useQuery({
    queryKey: ["All Categories", "Admin Panel"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/category");
        if (data.success) return data.categories;
        else return null;
      } catch (error) {
        return null;
      }
    },
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const [targetCategory, setTargetCategory] = useState({ title: "", subs: [] });
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const openModal2 = () => {
    setIsOpen2(true);
  };
  const closeModal2 = () => {
    setIsOpen2(false);
  };

  return (
    <>
      <ManagerAddCategoryComponent
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        refetchCategories={refetchCategories}
      />
      <ManagerEditCategoryComponent
        modalIsOpen={modalIsOpen2}
        closeModal={closeModal2}
        refetchCategories={refetchCategories}
        targetCategory={targetCategory}
      />
      <div className="p-4">
        <p className="text-primary text-center underline text-xl">
          Category Management Section
        </p>
        <div className="flex items-center gap-3 my-4">
          <p className="text-primary text-center underline font-semibold">
            Add Category
          </p>
          <button
            onClick={openModal}
            className="p-2 bg-primary text-white text-lg rounded-full duration-300 active:scale-90"
          >
            <FaPlus />
          </button>
        </div>
        {categories ? (
          categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-md mt-5">
              {categories.map((category, i) => (
                <div
                  key={i}
                  className="bg-primary bg-opacity-90 text-white p-4 rounded-md"
                >
                  <div className="flex items-center justify-between">
                    <p className="flex items-center flex-wrap">
                      Category Name:
                      <span className="font-semibold ml-2 border border-white px-3 py-1 rounded-full w-max">
                        {category.title}
                      </span>
                    </p>
                    <div className="flex flex-col gap-3">
                      {category.subs.length > 0 && (
                        <p className="underline text-orange-400">
                          Sub-Categories
                        </p>
                      )}
                      {category.subs.map((sub, j) => (
                        <p key={j}>{sub}</p>
                      ))}
                      {category.subs.length == 0 && (
                        <p className="text-red-400 w-max">No sub-categories</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-around">
                    <button
                      onClick={() => {
                        setTargetCategory(category);
                        openModal2();
                      }}
                      className="px-4 py-1 rounded-md text-orange-500 duration-300 bg-white font-semibold active:scale-90"
                    >
                      Edit
                    </button>
                    <button className="px-4 py-1 rounded-md text-red-500 duration-300 bg-white font-semibold active:scale-90">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No categories found!</p>
          )
        ) : (
          <div className="w-full h-[300px] flex items-center justify-center">
            <CgSpinner className="text-2xl text-primary animate-spin" />
          </div>
        )}
      </div>
    </>
  );
};

export default ManageCategoriesComponent;
