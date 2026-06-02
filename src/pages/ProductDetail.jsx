import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../services/api";

import "./ProductDetail.css";

import { addToCart } from "../services/cartService";

import { toast } from "react-toastify";

import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();

  const { cartCount, setCartCount } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id);
      setCartCount(cartCount + 1);
      toast.success("Product added to cart!");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to add product to cart",
      );
    }
  };

  return (
    <div className="product-detail">
      <div className="product-image">
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>

        <div className="product-price">₹ {product.price}</div>

        <p className="product-description">{product.description}</p>

        <div className="product-features">
          <p>✓ Free Delivery</p>

          <p>✓ Secure Payment</p>

          <p>✓ Easy Returns</p>
        </div>

        <div className="action-buttons">
          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add To Cart
          </button>

          {/* <button className="buy-now-btn">Buy Now</button> */}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
