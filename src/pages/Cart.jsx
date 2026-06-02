import { useEffect, useState } from "react";

import {
  getCartItems,
  removeCartItem,
  getCartCount,
} from "../services/cartService";

import { useCart } from "../context/CartContext";

import { toast } from "react-toastify";

import { getAddresses } from "../services/addressService";
import { useNavigate } from "react-router-dom";

import "./Cart.css";

function Cart() {
  const { cartCount, setCartCount } = useCart();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [total, setTotal] = useState(0);

  const [defaultAddress, setDefaultAddress] = useState([]);

  const calculateTotal = (items) => {
    let amount = 0;

    items.forEach((item) => {
      amount += item.product.price * item.quantity;
    });

    setTotal(amount);
  };

  const fetchCartItems = async () => {
    try {
      const response = await getCartItems();

      setCartItems(response.data);

      calculateTotal(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchDefaultAddress();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(itemId);
      fetchCartItems(); // Refresh the cart items after removal
      const cartCount = await getCartCount(); // Get the updated cart count
      setCartCount(cartCount); // Update the cart count
      toast.success("Item removed from cart");
    } catch (error) {
      console.log("Error removing cart item:", error);
    }
  };

  const fetchDefaultAddress = async () => {
    try {
      const response = await getAddresses();

      const address = response.data.find((item) => item.isDefault);
      setDefaultAddress(address);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty 🛒</h2>

          <p>Add some products to continue shopping</p>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={`http://localhost:5000/uploads/${item.product.image}`}
                  alt={item.product.name}
                />

                <div className="cart-details">
                  <h3>{item.product.name}</h3>

                  <p className="price">₹ {item.product.price}</p>

                  <p>
                    Quantity:
                    {item.quantity}
                  </p>

                  <p className="subtotal">
                    Subtotal: ₹ {item.product.price * item.quantity}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>

              <span>{cartCount}</span>
            </div>

            <div className="summary-row">
              <span>Grand Total</span>

              <span>₹ {total}</span>
            </div>

            {defaultAddress && (
              <div className="delivery-address">
                <h4>Deliver To</h4>

                <p>{defaultAddress.fullName}</p>

                <p>{defaultAddress.address}</p>

                <p>
                  {defaultAddress.city}, {defaultAddress.state}
                </p>

                <p>{defaultAddress.pincode}</p>
                <p>Mob: {defaultAddress.mobile}</p>
              </div>
            )}

            <button
              className="change-address-btn"
              onClick={() => navigate("/address")}
            >
              Change Address
            </button>

            <button className="checkout-btn">Proceed To Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
