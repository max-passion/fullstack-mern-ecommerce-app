import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={createProductHandler}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          <FaPlus /> Create Product
        </button>
      </div>

      {(loadingCreate || loadingDelete || isLoading) && <Loader />}

      {error && (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      )}

      {!isLoading && !error && data && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">NAME</th>
                <th className="px-4 py-2 border-b">PRICE</th>
                <th className="px-4 py-2 border-b">CATEGORY</th>
                <th className="px-4 py-2 border-b">BRAND</th>
                <th className="px-4 py-2 border-b">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{product._id}</td>
                  <td className="px-4 py-2 border-b">{product.name}</td>
                  <td className="px-4 py-2 border-b">${product.price}</td>
                  <td className="px-4 py-2 border-b">{product.category}</td>
                  <td className="px-4 py-2 border-b">{product.brand}</td>
                  <td className="px-4 py-2 border-b flex gap-2">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded text-white flex items-center"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-white flex items-center"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </div>
      )}
    </>
  );
};

export default ProductListScreen;
