import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 pb-16">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        {/* Checkout Steps with progress bar background */}
        <div className="mb-8">
          <div className="relative">
            {/* Background progress line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-lg"></div>
            {/* Steps */}
            <div className="relative z-10">
              <CheckoutSteps step1 step2 />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Shipping Information
        </h1>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              placeholder="Enter your city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              placeholder="Enter your country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-4 py-3 rounded-xl shadow-md transition-transform transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-300"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
