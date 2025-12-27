// components/PaymentButton.js
import React from "react";

const PaymentButton = () => {
  const handlePayment = async () => {
    if (!window.Pi) {
      alert("Pi SDK not loaded yet!");
      return;
    }

    try {
      const payment = await window.Pi.createPayment({
        amount: 0.1,
        memo: "Shop4Pi Test Payment",
        metadata: { orderId: "test123" },
      });

      console.log("Payment created:", payment);
      alert("Payment initiated! Check Pi Browser popup.");
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed: " + err.message);
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Pay 0.1 Pi
    </button>
  );
};

export default PaymentButton;
