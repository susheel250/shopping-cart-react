import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";

import "./Products.css";
import Loader from "../components/Loader";

function Products() {
  const [products, setProducts] = useState([]);
  const { cartCount, setCartCount } = useCart();
  const navigate = useNavigate();

  const [search, setSearch] =
  useState("");

  const [categories, setCategories] =
  useState([]); 

  const [categoryId, setCategoryId] =
  useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts(search, categoryId, page);

        setProducts(response.data.products);

        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
      finally {
      setLoading(false);
    }
    };

    

    fetchProducts();
  }, [search, categoryId, page]);

  const fetchCategories =
  async () => {

    const response =
      await api.get(
        "/categories/list"
      );

    setCategories(
      response.data
    );

  };

useEffect(() => {

  fetchCategories();

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

    if (loading) {
      return <Loader />;
    }
  return (
    <div className="products-page">
      <div className="products-toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="category-select"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <br />
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
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={page === index + 1 ? "active-page" : ""}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
