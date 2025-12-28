import { approvePayment } from "../services/api";
import { useState } from "react";

export default function PaymentButton({ paymentId }: { paymentId: string }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await approvePayment(paymentId);
      if (res.approved) {
        setStatus("Payment approved ✅");
      } else {
        setStatus("Payment failed ❌");
      }
    } catch (err) {
      setStatus("Error occurred ❌");
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Processing..." : "Approve Payment"}
      </button>
      <p>{status}</p>
    </div>
  );
}
