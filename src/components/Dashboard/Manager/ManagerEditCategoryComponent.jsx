import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaSpinner, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import { toast } from "react-toastify";

const ManagerEditCategoryComponent = ({
  modalIsOpen,
  closeModal,
  refetchCategories,
  targetCategory,
}) => {
  const subCategoryRef = useRef();
  const categoryRef = useRef();
  const [loading, setLoading] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  console.log(targetCategory);

  useEffect(() => {
    setSubcategories(targetCategory?.subs);
  }, [targetCategory, modalIsOpen]);

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

  const addSubcategory = () => {
    setSubcategories([...subcategories, subCategoryRef.current.value]);
    subCategoryRef.current.value = "";
  };

  const deleteSubCategory = (i) => {
    setSubcategories((prevSubcategories) => {
      const newSubcategories = [...prevSubcategories];
      newSubcategories.splice(i, 1);
      return newSubcategories;
    });
  };

  const saveCategory = async () => {
    const mainCategory = categoryRef.current.value;
    if (!mainCategory) return toast.error("Enter category");
    if (subcategories.length == 0) {
      const confirmation = confirm(
        "Do you want to proceed without any subcategories?"
      );
      if (!confirmation) return;
    }
    try {
      setLoading(true);
      const { data } = await axios.put("/api/category", {
        id: targetCategory._id,
        mainCategory,
        subcategories,
      });
      if (data.success) {
        await refetchCategories();
        closeModal();
        setSubcategories([]);
        toast.success("Category added successfully");
      } else {
        toast.error("Something went wrong, Try again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Try again!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <p className="text-center underline text-xl">Edit Category</p>
      <div className="flex items-center gap-3 mt-4">
        <p className="min-w-44">Category name:</p>
        <input
          ref={categoryRef}
          type="text"
          className="px-2 py-1 rounded text-primary outline-none"
          placeholder="Enter category"
          name=""
          id=""
          defaultValue={targetCategory.title}
        />
      </div>
      <div className="flex items-center gap-3 mt-4">
        <p className="min-w-44">Sub-category name:</p>
        <input
          ref={subCategoryRef}
          type="text"
          className="px-2 py-1 rounded text-primary outline-none"
          placeholder="Enter sub-category"
        />
        <button
          onClick={addSubcategory}
          type="button"
          className="p-2 bg-white text-primary text-lg rounded-full duration-300 active:scale-90"
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex items-center gap-3 flex-wrap mt-4">
        {subcategories?.map((subcategory, i) => (
          <p className="border px-4 pr-1 py-1 flex items-center gap-3" key={i}>
            {subcategory}
            <FaTimes
              onClick={() => deleteSubCategory(i)}
              className="text-lg cursor-pointer duration-300 active:scale-90"
            />
          </p>
        ))}
      </div>
      <div className="flex items-center justify-around mt-5">
        <button
          onClick={saveCategory}
          type="button"
          className="bg-white text-primary px-5 py-1 rounded-md font-semibold duration-300 active:scale-90"
        >
          {loading ? <FaSpinner className="text-xl animate-spin" /> : "Update"}
        </button>
        <button
          onClick={() => {
            // setSubcategories([]);
            closeModal();
          }}
          type="button"
          className="bg-white text-red-500 px-5 py-1 rounded-md font-semibold duration-300 active:scale-90"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ManagerEditCategoryComponent;
