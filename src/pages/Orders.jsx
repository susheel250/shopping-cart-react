import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import { Link } from "react-router-dom";
import "./Orders.css";
import Loader from "../components/Loader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getMyOrders();

      // Adjust if your API returns { orders: [...] }
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }finally{   
    setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h3>No Orders Found</h3>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="order-card"
          >
            <div className="order-header">
              <h3>Order #{order.id}</h3>

              <span
                className={`status ${order.status.toLowerCase()}`}
              >
                {order.status}
              </span>
            </div>

            <p>
              Total:
              <strong>
                ₹{order.total}
              </strong>
            </p>

            <p>
              Date:
              {" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>

            <Link
              to={`/orders/${order.id}`}
              className="details-btn"
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;