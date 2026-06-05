import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getOrderById,
} from "../services/orderService";

import "./OrderDetails.css";
import Loader from "../components/Loader";

function OrderDetails() {
  const { id } =
    useParams();

  const [order, setOrder] =
    useState(null);
    const [loading, setLoading] =  useState(true);

  const fetchOrder =
    async () => {
      try {
        setLoading(true);
        const response =
          await getOrderById(id);

        setOrder(
          response.data
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="order-details">

      <h1>
        Order #{order.id}
      </h1>

      <div className="info-card">
        <p>
          Status:
          <strong>
            {order.status}
          </strong>
        </p>

        <p>
          Total:
          <strong>
            ₹{order.total}
          </strong>
        </p>
      </div>

      <div className="info-card">
        <h3>
          Delivery Address
        </h3>

        <p>
          {order.address
            ?.fullName}
        </p>

        <p>
          {order.address
            ?.mobile}
        </p>

        <p>
          {order.address
            ?.address}
        </p>
      </div>

      <div className="info-card">
        <h3>
          Ordered Items
        </h3>

        {order.items.map(
          (item) => (
            <div
              key={item.id}
              className="item-row"
            >
              <img
                src={`http://localhost:5000/uploads/${item.product.image}`}
                alt={
                  item.product.name
                }
              />

              <div>
                <h4>
                  {
                    item.product
                      .name
                  }
                </h4>

                <p>
                  Qty:
                  {
                    item.quantity
                  }
                </p>

                <p>
                  ₹
                  {
                    item.product
                      .price
                  }
                </p>
              </div>
            </div>
          )
        )}
      </div>

    </div>
  );
}

export default OrderDetails;