import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => dispatch(addToCart({ ...product, qty }));
  const removeFromCartHandler = (id) => dispatch(removeFromCart(id));
  const checkoutHandler = () => navigate('/login?redirect=/shipping');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center lg:text-left">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Cart Items */}
        <div className="flex-1 space-y-6">
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty{' '}
              <Link to="/" className="text-indigo-600 hover:underline">Go Back</Link>
            </Message>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition"
              >
                {/* Product Image */}
                <div className="w-full sm:w-40 h-40 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/product/${item._id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-700 mt-1 font-medium">${item.price}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <select
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                      className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 transition"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className="text-red-600 hover:text-red-800 transition p-2 rounded-md"
                      aria-label="Remove Item"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Order Summary */}
        {cartItems.length > 0 && (
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-gradient-to-b from-gray-100 to-white rounded-2xl p-8 shadow-xl sticky top-24 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-300 pb-4">
                Order Summary
              </h2>

              <div className="flex justify-between items-center text-lg font-medium">
                <span>Items</span>
                <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
              </div>

              <div className="flex justify-between items-center text-lg font-medium">
                <span>Total</span>
                <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </div>

              <button
                type="button"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 hover:scale-[1.02] disabled:opacity-50"
              >
                Proceed to Checkout
              </button>

              <p className="text-sm text-gray-500 mt-2 text-center">
                Secure checkout with encryption
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
