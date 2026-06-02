import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const { cartCount, setCartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products/list");

        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");   
    if (!token) {
      toast.error("Please login to add products to cart");
      navigate("/login");
      return;
    }
      try {
        await addToCart(productId);

        toast.success("Product added to cart");

        setCartCount(cartCount + 1);
      } catch (error) {
        console.log(error);

        toast.error("Failed to add product");
      }
    };

  return (
    <div className="products-page">
      <h1>Our Products</h1>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
              />
            </Link>

            <div className="product-content">
              <h2>{product.name}</h2>

              <p className="price">₹ {product.price}</p>

              <p className="description">{product.description}</p>

              <div className="product-actions">
                <Link to={`/products/${product.id}`} className="view-btn">
                  View Details
                </Link>

                <button
                  className="cart-btn"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
