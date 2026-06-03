import { Link } from "react-router-dom";
import "./Payment.css";

function PaymentCancel() {
  return (
    <div className="payment-page">
      <div className="payment-card cancel">

        <div className="icon">❌</div>

        <h1>Payment Cancelled</h1>

        <p>
          Your payment was not completed.
          You can try again whenever you're ready.
        </p>

        <div className="actions">
          <Link
            to="/checkout"
            className="btn-primary"
          >
            Try Again
          </Link>

          <Link
            to="/cart"
            className="btn-secondary"
          >
            Back To Cart
          </Link>
        </div>

      </div>
    </div>
  );
}

export default PaymentCancel;