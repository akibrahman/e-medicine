import React from "react";

const Sidebar = ({ categories }) => {
  return (
    <div className="w-full">
      <p>{categories.length}</p>
      {categories.map((category) => (
        <p key={category._id}>{category.title}</p>
      ))}
    </div>
  );
};

export default Sidebar;
