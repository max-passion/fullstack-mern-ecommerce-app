import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        toast.success("Product created");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Products</h1>
          <p className="text-gray-500">Manage your store’s inventory</p>
        </div>
        <button
          onClick={createProductHandler}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 shadow-lg transition"
        >
          <FaPlus className="text-sm" /> Create Product
        </button>
      </div>

      {/* Loaders & Messages */}
      {(loadingCreate || loadingDelete || isLoading) && <Loader />}
      {error && (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      )}

      {/* Products Table */}
      {!isLoading && !error && data && (
        <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-gray-100">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-mono text-sm text-gray-700 truncate max-w-[160px]">
                    {product._id}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">${product.price}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{product.brand}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-100">
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;
