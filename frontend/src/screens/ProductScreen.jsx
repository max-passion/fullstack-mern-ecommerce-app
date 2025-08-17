import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';
import { FaShoppingCart, FaSearchPlus, FaTimes } from 'react-icons/fa';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [zoom, setZoom] = useState(false); // Zoom modal state

  const { data: product, isLoading, refetch, error } =
    useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success('Review created successfully');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link
        to="/"
        className="inline-block px-4 py-2 mb-6 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-shadow shadow-sm"
      >
        ← Back to Home
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />

          {/* Product Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image */}
            <div className="md:col-span-1 relative flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md rounded-2xl shadow-lg"
              />
              {/* Zoom Button */}
              <button
                onClick={() => setZoom(true)}
                className="absolute bottom-4 right-4 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
                title="Zoom Image"
              >
                <FaSearchPlus className="text-lg" />
              </button>
            </div>

            {/* Product Details */}
            <div className="md:col-span-1 flex flex-col justify-between space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                <p className="mt-3 text-xl font-semibold text-emerald-500">
                  ${product.price}
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="md:col-span-1">
              <div className="p-6 bg-white rounded-2xl shadow-lg space-y-6 flex flex-col">
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>Price:</span>
                  <span className="font-bold text-xl text-emerald-500">${product.price}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>Status:</span>
                  <span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                </div>

                {product.countInStock > 0 && (
                  <div className="flex items-center justify-between">
                    <label htmlFor="qty" className="font-medium">
                      Quantity:
                    </label>
                    <select
                      id="qty"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="border rounded-lg px-3 py-1 focus:ring-2 focus:ring-emerald-400"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  type="button"
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className={`w-full py-3 rounded-lg flex justify-center items-center text-white font-semibold ${
                    product.countInStock === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-emerald-500 hover:bg-emerald-600'
                  } transition duration-300`}
                >
                  <FaShoppingCart className="mr-2" /> Add To Cart
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 md:w-2/3">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

            {product.reviews.length === 0 && <Message>No Reviews</Message>}

            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-gray-900">{review.name}</strong>
                    <span className="text-sm text-gray-500">
                      {review.createdAt.substring(0, 10)}
                    </span>
                  </div>
                  <Rating value={review.rating} />
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}

              {/* Review Form */}
              <div className="p-6 bg-white rounded-2xl shadow-lg space-y-4">
                <h3 className="text-xl font-semibold">Write a Review</h3>

                {loadingProductReview && <Loader />}

                {userInfo ? (
                  <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                      <label htmlFor="rating" className="block font-medium mb-1">
                        Rating
                      </label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                        className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-400 focus:ring-2"
                      >
                        <option value="">Select rating...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="comment" className="block font-medium mb-1">
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-400 focus:ring-2"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loadingProductReview}
                      className="w-full py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 disabled:bg-gray-400 transition duration-300"
                    >
                      Submit Review
                    </button>
                  </form>
                ) : (
                  <Message>
                    Please <Link to="/login" className="text-emerald-500 hover:underline">sign in</Link> to write a review
                  </Message>
                )}
              </div>
            </div>
          </div>

          {/* Zoom Modal */}
          {zoom && (
            <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
              <button
                onClick={() => setZoom(false)}
                className="absolute top-6 right-6 text-white text-3xl"
              >
                <FaTimes />
              </button>
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[90%] max-w-[90%] rounded-lg shadow-2xl"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductScreen;
