import { Link } from "react-router-dom";
import "./Payment.css";

function PaymentSuccess() {
  return (
    <div className="payment-page">
      <div className="payment-card success">

        <div className="icon">✅</div>

        <h1>Payment Successful</h1>

        <p>
          Thank you for your purchase.
          Your order has been placed successfully.
        </p>

        <div className="actions">
          <Link
            to="/orders"
            className="btn-primary"
          >
            View My Orders
          </Link>

          <Link
            to="/products"
            className="btn-secondary"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}

export default PaymentSuccess;