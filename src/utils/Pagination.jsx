import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const Pagination = ({ page, setPage, pages, totalPages }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-20 border p-1 border-primary mt-3 rounded-md">
      <button
        onClick={() => setPage(page - 1)}
        className="bg-primary text-white px-3 py-[2px] transition-all active:scale-90 disabled:bg-slate-400 border border-primary disabled:border-slate-400 flex items-center gap-1"
        disabled={page == 0 ? true : false}
      >
        <FaAnglesLeft />
        Prev
      </button>
      {pages.map((item, index) => (
        <button
          key={index}
          onClick={() => setPage(index)}
          className={`px-3 py-[2px] transition-all active:scale-90 ${
            page == index
              ? "bg-primary text-white border border-transparent"
              : "bg-white text-primary border border-primary"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => setPage(page + 1)}
        className="bg-primary text-white px-3 py-[2px] transition-all active:scale-90 disabled:bg-slate-400 border border-primary disabled:border-slate-400 flex items-center gap-1"
        disabled={page == totalPages - 1 ? true : false}
      >
        Next
        <FaAnglesRight />
      </button>
    </div>
  );
};

export default Pagination;
