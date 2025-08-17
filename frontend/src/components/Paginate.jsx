import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center space-x-2 my-4">
      {[...Array(pages).keys()].map((x) => {
        const pageNumber = x + 1;
        const link = !isAdmin
          ? keyword
            ? `/search/${keyword}/page/${pageNumber}`
            : `/page/${pageNumber}`
          : `/admin/productlist/${pageNumber}`;

        return (
          <Link
            key={pageNumber}
            to={link}
            className={`px-3 py-1 border rounded ${
              pageNumber === page
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}
    </div>
  );
};

export default Paginate;
