import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);

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

              <button>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
