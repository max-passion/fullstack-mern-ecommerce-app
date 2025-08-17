import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Package, Truck, CreditCard, ShoppingCart, ArrowRight } from "lucide-react";

// import { Card, CardContent } from "../components/ui/Card";
// import { Button } from "../components/ui/Button";

import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress?.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Something went wrong");
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* LEFT SIDE: Shipping, Payment, Items */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Shipping */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-blue-600" /> Shipping
              </h2>
              <p className="text-gray-700">
                <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-blue-600" /> Payment Method
              </h2>
              <p className="text-gray-700">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
                <ShoppingCart className="w-5 h-5 text-blue-600" /> Order Items
              </h2>

              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div className="space-y-4">
                  {cart.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <Link
                          to={`/product/${item.product}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <p className="text-gray-700">
                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* RIGHT SIDE: Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-blue-600" /> Order Summary
              </h2>

              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>${cart.itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${cart.shippingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${cart.taxPrice}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-3">
                  <span>Total</span>
                  <span>${cart.totalPrice}</span>
                </div>
              </div>

              {error && (
                <Message variant="danger" className="mt-3">
                  {error.data?.message || error.error}
                </Message>
              )}

              <Button
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length === 0}
                className="w-full mt-6 flex items-center justify-center gap-2"
              >
                Place Order <ArrowRight className="w-5 h-5" />
              </Button>

              {isLoading && <Loader />}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
