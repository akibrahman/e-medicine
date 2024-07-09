"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MedicineCard from "../MedicineCard/MedicineCard";

const DisplayPage = ({
  medicines = [],
  categories = [],
  activeCategory = "",
  activeMenu = [],
  setActiveMenu,
}) => {
  const [displayMedicines, setDisplayMedicines] = useState([...medicines]);
  const [showMedicine, setShowMedicine] = useState(true);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    //
    if (activeCategory) {
      if (activeMenu[0] == "category" && activeMenu[1] == activeCategory) {
        if (activeMenu[2] > 0) {
          setShowMedicine(false);
          setDisplayMedicines([]);
          const targetCategory = categories.find(
            (category) => category.title == activeCategory
          );
          setSubcategories([...targetCategory.subs]);
          console.log("Should Show subcategories of ", activeCategory);
        } else {
          setShowMedicine(true);
          setSubcategories([]);
          const temp = setDisplayMedicines(
            medicines.filter((medicine) => medicine.category == activeCategory)
          );
          console.log("Should Show Products of ", activeCategory);
        }
      } else if (activeMenu[0] == "subcategory") {
        setShowMedicine(true);
        setSubcategories([]);
        setDisplayMedicines(
          medicines.filter((medicine) => medicine.category == activeMenu[1])
        );
        console.log("Should Show Products of ", activeMenu[1]);
      }
    } else if (!activeCategory) {
      setShowMedicine(true);
      setDisplayMedicines([...medicines]);
    }
    //
  }, [activeCategory, activeMenu, medicines, categories]);

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <p className="font-semibold">
          {showMedicine ? "Medicines" : "Sub-Categories"}
        </p>
        <p className="text-primary underline cursor-pointer font-semibold">
          See All
        </p>
        <p>{displayMedicines.length}</p>
      </div>
      {showMedicine && (
        <div className="grid grid-cols-4 gap-5 p-4">
          {displayMedicines.map((medicine, i) => (
            <MedicineCard key={i} medicine={medicine} />
          ))}
        </div>
      )}
      {showMedicine || (
        <div className="flex items-center gap-4 flex-wrap p-4">
          {subcategories.map((sub, i) => (
            <div
              onClick={() => {
                setActiveMenu(["subcategory", sub.title, 0]);
              }}
              key={i}
              className="flex flex-col items-center gap-3 bg-secondary p-4 rounded-md cursor-pointer duration-300 hover:scale-105 active:scale-90"
            >
              <Image
                src={sub.photoUrl}
                alt={sub.title}
                height={120}
                width={120}
                className="aspect-square rounded-md"
              />
              <p>{sub.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayPage;
