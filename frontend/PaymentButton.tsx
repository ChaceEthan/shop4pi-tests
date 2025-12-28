import React from "react";
import { approvePayment } from "../services/api";

type Props = {
  paymentId: string;
};

const PaymentButton: React.FC<Props> = ({ paymentId }) => {
  const handleClick = async () => {
    try {
      const result = await approvePayment(paymentId);
      alert("Payment approved: " + JSON.stringify(result.payment));
    } catch (err: any) {
      console.error(err);
      alert("Payment failed: " + err.message);
    }
  };

  return <button onClick={handleClick}>Approve Payment</button>;
};

export default PaymentButton;
