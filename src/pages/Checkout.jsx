import { useEffect, useState } from "react";

import { getCartItems } from "../services/cartService";

import { getAddresses } from "../services/addressService";
import { createOrder } from "../services/orderService";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import "./Checkout.css";
import { createCheckoutSession } from "../services/paymentService";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  const [address, setAddress] = useState(null);

  const [total, setTotal] = useState(0);

  const [itemCount, setItemCount] = useState(0);

  const navigate = useNavigate();

  const fetchCheckoutData = async () => {
    try {
      const cartResponse = await getCartItems();

      const items = cartResponse.data;

      setCartItems(items);

      let grandTotal = 0;

      let totalItems = 0;

      items.forEach((item) => {
        grandTotal += item.product.price * item.quantity;

        totalItems += item.quantity;
      });

      setTotal(grandTotal);

      setItemCount(totalItems);

      const addressResponse = await getAddresses();

      const defaultAddress = addressResponse.data.find(
        (item) => item.isDefault,
      );

      setAddress(defaultAddress);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      if (!address) {
        toast.error("Please select a delivery address");
        return;
      }

      // Create Order
      const orderResponse = await createOrder();
      const orderId = orderResponse.data.order.id;
      // Create Stripe Session
      const sessionResponse = await createCheckoutSession(orderId);

      // Redirect Stripe
      window.location.href = sessionResponse.data.url;
    } catch (error) {
      console.log(error);

      toast.error("Failed to start payment");
    }
  };
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {address && (
        <div className="address-card">
          <h2>Delivery Address</h2>

          <p>{address.fullName}</p>

          <p>{address.mobile}</p>

          <p>{address.address}</p>

          <p>
            {address.city}, {address.state} - {address.pincode}
          </p>
        </div>
      )}

      <div className="checkout-layout">
        <div className="checkout-items">
          <h2>Order Items</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item">
              <img
                src={`http://localhost:5000/uploads/${item.product.image}`}
                alt={item.product.name}
              />

              <div>
                <h3>{item.product.name}</h3>

                <p>₹ {item.product.price}</p>

                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Items</span>

            <span>{itemCount}</span>
          </div>

          <div className="summary-row">
            <span>Grand Total</span>

            <span>₹ {total}</span>
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
