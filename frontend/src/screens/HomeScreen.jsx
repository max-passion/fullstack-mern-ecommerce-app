import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import Rating from '../components/Rating';
import { FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../slices/cartSlice';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link
          to="/"
          className="inline-block mb-6 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium shadow-sm hover:shadow-md transition duration-300"
        >
          ← Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
            Latest Products
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.products.map((product) => (
              <div
                key={product._id}
                className="relative flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Product Image */}
                <Link to={`/product/${product._id}`} className="block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
                  />
                </Link>

                {/* Info Panel */}
                <div className="p-4 flex flex-col justify-between flex-1 relative">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {product.name}
                    </h2>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                    <p className="mt-2 text-md font-bold text-emerald-500">
                      ${product.price}
                    </p>
                  </div>

                  {/* Add-to-Cart Icon Button */}
                  <button
                    onClick={() => addToCartHandler(product)}
                    className="absolute bottom-4 right-4 bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full shadow-md transition duration-300 flex items-center justify-center cursor-pointer"
                    title="Add to Cart"
                  >
                    <FaShoppingCart className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
