import axios from "axios";
import Image from "next/image";
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

  const [categoryPhotoFile, setCategoryPhotoFile] = useState(null);
  const [categoryPhotoUrl, setCategoryPhotoUrl] = useState(null);

  const [subcategoryPhotoUrl, setSubcategoryPhotoUrl] = useState(null);
  const [subcategoryPhotoFile, setSubcategoryPhotoFile] = useState(null);

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
    if (
      !subCategoryRef.current.value ||
      !subcategoryPhotoUrl ||
      !subcategoryPhotoFile
    )
      return;
    setSubcategories([
      ...subcategories,
      {
        title: subCategoryRef.current.value,
        photoUrl: subcategoryPhotoUrl,
        photoFile: subcategoryPhotoFile,
      },
    ]);

    subCategoryRef.current.value = "";
    setSubcategoryPhotoFile(null);
    setSubcategoryPhotoUrl(null);
  };

  const deleteSubCategory = async (i) => {
    console.log(subcategories[i]);
    try {
      const { data } = await axios.get(
        `/api/product?category=${subcategories[i].title}`
      );
      if (data.success) {
        console.log(data.products);
        if (data.products.length > 0) {
          toast.info(
            "Products found under this sub-category, First manage those products."
          );
          return;
        } else {
          setSubcategories((prevSubcategories) => {
            const newSubcategories = [...prevSubcategories];
            newSubcategories.splice(i, 1);
            return newSubcategories;
          });
        }
      } else {
        toast.error("Server error, Try again!");
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error, Try again!");
      return;
    }
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
      //-------------------
      const formData = new FormData();
      // Append array of objects
      subcategories.forEach((item, index) => {
        if (item.photoFile) {
          formData.append(`files[${index}][photoFile]`, item.photoFile);
          formData.append(`files[${index}][title]`, item.title);
        }
      });
      subcategories.forEach((item, index) => {
        if (!item.photoFile) {
          formData.append(`oldfiles[${index}][photoUrl]`, item.photoUrl);
          formData.append(`oldfiles[${index}][title]`, item.title);
        }
      });

      if (categoryPhotoFile)
        formData.append("mainPhotoFile", categoryPhotoFile);
      else formData.append("mainPhotoUrl", targetCategory.photoUrl);
      formData.append("mainTitle", categoryRef.current.value);
      formData.append("id", targetCategory._id);
      setLoading(true);
      const { data } = await axios.put("/api/category", formData);
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
      <div className="my-4 flex items-center gap-4">
        <label htmlFor="photo" className="block min-w-44">
          Category Photo:
        </label>
        <label
          htmlFor="photo"
          className="w-12 h-12 rounded-full border-dotted border cursor-pointer flex items-center justify-center"
        >
          <Image
            width={60}
            height={60}
            className="rounded-full aspect-square"
            alt="Profile picture for sign up"
            src={categoryPhotoUrl || targetCategory.photoUrl}
          />
        </label>
        <input
          type="file"
          accept="image/*"
          id="photo"
          name="photo"
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              setCategoryPhotoFile(file);
              const photoUrl = URL.createObjectURL(file);
              setCategoryPhotoUrl(photoUrl);
            }
          }}
          hidden
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

      <div className="my-4 flex items-center gap-4">
        <label htmlFor="photo" className="block min-w-44">
          Sub-category Photo:
        </label>
        <label
          htmlFor="photo2"
          className="w-12 h-12 rounded-full border-dotted border cursor-pointer flex items-center justify-center"
        >
          {subcategoryPhotoUrl ? (
            <Image
              width={60}
              height={60}
              className="rounded-full aspect-square"
              alt="picture of sub category"
              src={subcategoryPhotoUrl}
            />
          ) : (
            <FaPlus />
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          id="photo2"
          name="photo2"
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              setSubcategoryPhotoFile(file);
              const photoUrl = URL.createObjectURL(file);
              setSubcategoryPhotoUrl(photoUrl);
            }
          }}
          hidden
        />
      </div>

      <div className="flex items-center gap-3 flex-wrap mt-4">
        {subcategories.map((subcategory, i) => (
          <p className="border px-4 pr-1 py-1 flex items-center gap-3" key={i}>
            <Image
              src={subcategory.photoUrl}
              alt={subcategory.title}
              height={30}
              width={30}
              className="aspect-square"
            />
            {subcategory.title}
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
            setSubcategories([]);
            setCategoryPhotoUrl(null);
            setCategoryPhotoFile(null);
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
