import React from "react";

export default function Home() {
  const handleLoginAndPayment = async () => {
    if (!window.Pi) {
      alert("Pi SDK is still loading, please wait...");
      return;
    }

    try {
      // Step 1: Authenticate user (permission for payments)
      const auth = await window.Pi.authenticate(["payments"]);
      alert("Hello " + auth.user.username);

      // Step 2: Create a payment (Step 10)
      const payment = await window.Pi.createPayment({
        amount: 0.1, // Testnet Pi
        memo: "Shop4Pi Test Payment",
        metadata: { orderId: "test123" }, // You can change orderId
      });

      console.log("Payment initiated:", payment);
      alert("Payment initiated! Check the Pi Browser popup.");

    } catch (err) {
      console.error("Error:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Welcome to Shop4Pi</h1>
      <p>Welcome to Shop4Pi! Click the button below to log in and make a payment.</p>
      <button
        onClick={handleLoginAndPayment}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Login & Pay 0.1 Pi
      </button>
    </div>
  );
}
