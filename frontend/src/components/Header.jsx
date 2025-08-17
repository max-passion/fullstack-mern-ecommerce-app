import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import SearchBox from "./SearchBox";
import logo from "../assets/logo.png";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="ProShop" className="h-10 w-10 rounded-full" />
            <span className="font-bold text-2xl text-gray-800 tracking-tight">
              ProShop
            </span>
          </Link>

          <div className="flex-1 mx-6 hidden md:flex">
            <SearchBox />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              <FaShoppingCart className="text-xl" />
              <span className="ml-1">Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs animate-pulse">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>

            {/* User */}
            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                  <FaUser className="mr-1" />
                  {userInfo.name}
                </button>
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform scale-95 group-hover:scale-100 origin-top-right">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                <FaUser className="mr-1" />
                Sign In
              </Link>
            )}

            {/* Admin */}
            {userInfo && userInfo.isAdmin && (
              <div className="relative group">
                <button className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                  Admin
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform scale-95 group-hover:scale-100 origin-top-right">
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                  >
                    Products
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                  >
                    Users
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-700 hover:text-indigo-600 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-200 py-4 px-6 space-y-2">
            <SearchBox />
            <Link
              to="/cart"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cart ({cartItems.reduce((a, c) => a + c.qty, 0)})
            </Link>
            {userInfo ? (
              <>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Logout
                </button>
                {userInfo.isAdmin && (
                  <>
                    <Link
                      to="/admin/productlist"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Products
                    </Link>
                    <Link
                      to="/admin/orderlist"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/admin/userlist"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Users
                    </Link>
                  </>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Add padding to prevent overlap with fixed header */}
      <div className="pt-20 md:pt-24"></div>
    </>
  );
};

export default Header;
