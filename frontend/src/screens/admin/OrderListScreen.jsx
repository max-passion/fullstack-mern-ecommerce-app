import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">USER</th>
                <th className="px-6 py-4">DATE</th>
                <th className="px-6 py-4">TOTAL</th>
                <th className="px-6 py-4 text-center">PAID</th>
                <th className="px-6 py-4 text-center">DELIVERED</th>
                <th className="px-6 py-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono text-sm text-gray-700 truncate max-w-[160px]">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.user?.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-gray-700">${order.totalPrice}</td>
                  <td className="px-6 py-4 text-center">
                    {order.isPaid ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                        {order.paidAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-200">
                        <FaTimes className="text-red-500" /> Not Paid
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {order.isDelivered ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                        {order.deliveredAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
                        <FaTimes className="text-amber-600" /> Not Delivered
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/order/${order._id}`}
                      className="inline-flex items-center justify-center w-20 h-9 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition text-sm"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;
