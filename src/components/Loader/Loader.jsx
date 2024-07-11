import React from "react";
import { CgSpinner } from "react-icons/cg";

const Loader = () => {
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <CgSpinner className="text-2xl text-primary animate-spin" />
    </div>
  );
};

export default Loader;
