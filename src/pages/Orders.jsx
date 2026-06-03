import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import { Link } from "react-router-dom";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getMyOrders();

      // Adjust if your API returns { orders: [...] }
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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