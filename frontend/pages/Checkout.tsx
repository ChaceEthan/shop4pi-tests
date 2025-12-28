import React, { useState } from "react";
import PaymentButton from "../components/PaymentButton";

const Checkout: React.FC = () => {
  const [paymentId, setPaymentId] = useState("");

  return (
    <div>
      <h1>Checkout</h1>
      <input
        type="text"
        placeholder="Enter Payment ID"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
      />
      <PaymentButton paymentId={paymentId} />
    </div>
  );
};

export default Checkout;
