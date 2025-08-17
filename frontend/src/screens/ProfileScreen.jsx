import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await updateProfile({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // helper for avatar initial
  const initial = (userInfo?.name || "U").trim().charAt(0).toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Account
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your profile and review your recent orders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Profile card */}
        <section className="lg:col-span-4">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">
            {/* subtle accent bar */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400" />
            <div className="p-6 sm:p-8">
              {/* Avatar + meta */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center font-bold text-indigo-700 text-xl border border-indigo-100">
                  {initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-tight">
                    {userInfo?.name}
                  </p>
                  <p className="text-sm text-gray-500">{userInfo?.email}</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={submitHandler} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full cursor-pointer rounded-2xl px-5 py-3 font-semibold text-white shadow-lg transition ${
                    loadingUpdateProfile
                      ? "bg-indigo-400"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {loadingUpdateProfile ? "Updating..." : "Update profile"}
                </button>

                {loadingUpdateProfile && <Loader />}
              </form>
            </div>
          </div>
        </section>

        {/* RIGHT: Orders */}
        <section className="lg:col-span-8">
          <div className="relative rounded-3xl bg-white shadow-xl overflow-hidden">
            {/* subtle accent bar */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400" />
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">My Orders</h2>
                <p className="text-sm text-gray-500">
                  {orders?.length ? `${orders.length} order(s)` : "—"}
                </p>
              </div>
            </div>

            {/* Loading / Error */}
            {isLoading ? (
              <div className="p-6 sm:p-8">
                <Loader />
              </div>
            ) : error ? (
              <div className="p-6 sm:p-8">
                <Message variant="danger">
                  {error?.data?.message || error.error}
                </Message>
              </div>
            ) : (
              <>
                {/* Table (desktop) */}
                <div className="hidden md:block">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="text-left text-sm text-gray-600 bg-gray-50">
                        <th className="px-6 py-3 font-semibold">Order ID</th>
                        <th className="px-6 py-3 font-semibold">Date</th>
                        <th className="px-6 py-3 font-semibold">Total</th>
                        <th className="px-6 py-3 font-semibold">Paid</th>
                        <th className="px-6 py-3 font-semibold">Delivered</th>
                        <th className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders?.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-mono text-sm text-gray-800 truncate max-w-[220px]">
                            {order._id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {order.createdAt.substring(0, 10)}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            ${order.totalPrice}
                          </td>
                          <td className="px-6 py-4">
                            {order.isPaid ? (
                              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                                Paid • {order.paidAt.substring(0, 10)}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-200">
                                <FaTimes className="text-red-500" /> Not paid
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {order.isDelivered ? (
                              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                                Delivered • {order.deliveredAt.substring(0, 10)}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
                                <FaTimes className="text-amber-600" /> Not delivered
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              to={`/order/${order._id}`}
                              className="inline-flex items-center rounded-xl bg-gray-900/90 text-white text-sm px-4 py-2 shadow-sm hover:bg-gray-900 transition cursor-pointer"
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cards (mobile) */}
                <div className="md:hidden divide-y divide-gray-100">
                  {orders?.map((order) => (
                    <div key={order._id} className="p-5">
                      <div className="flex justify-between items-start gap-3">
                        <div className="min-w-0">
                          <p className="font-mono text-sm text-gray-800 truncate">
                            {order._id}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.createdAt.substring(0, 10)}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          ${order.totalPrice}
                        </p>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {order.isPaid ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                            Paid • {order.paidAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-200">
                            <FaTimes className="text-red-500" /> Not paid
                          </span>
                        )}
                        {order.isDelivered ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                            Delivered • {order.deliveredAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
                            <FaTimes className="text-amber-600" /> Not delivered
                          </span>
                        )}
                      </div>

                      <div className="mt-4">
                        <Link
                          to={`/order/${order._id}`}
                          className="inline-flex items-center rounded-xl bg-gray-900/90 text-white text-sm px-4 py-2 shadow-sm hover:bg-gray-900 transition cursor-pointer"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileScreen;
