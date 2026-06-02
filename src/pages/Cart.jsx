import { useEffect, useState } from "react";

import { getCartItems, removeCartItem } from "../services/cartService";

import { useCart } from "../context/CartContext";

import "./Cart.css";

function Cart() {
  const { cartCount, setCartCount } = useCart();


  const [cartItems, setCartItems] = useState([]);

  const [total, setTotal] = useState(0);

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
  }, []);

  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(itemId);
      fetchCartItems(); // Refresh the cart items after removal
        setCartCount(cartCount - 1); // Decrease cart count by 1
    } catch (error) {
      console.log("Error removing cart item:", error);
    }
  };

  return (
    <div className="cart-container">
      <h1>My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Cart is Empty</h2>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={`http://localhost:5000/uploads/${item.product.image}`}
                alt={item.product.name}
              />

              <div className="cart-details">
                <h3>{item.product.name}</h3>

                <p>Price: ₹ {item.product.price}</p>

                <p>
                  Quantity:
                  {item.quantity}
                </p>

                <p>Subtotal: ₹ {item.product.price * item.quantity}</p>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Grand Total: ₹ {total}</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
