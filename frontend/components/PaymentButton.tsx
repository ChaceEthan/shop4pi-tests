import { approvePayment } from "../services/api";

declare global {
  interface Window {
    Pi: any;
  }
}

export default function PaymentButton() {
  const payWithPi = async () => {
    if (!window.Pi) {
      alert("Pi SDK not found");
      return;
    }

    await window.Pi.authenticate(["payments"], async () => {
      const payment = await window.Pi.createPayment(
        {
          amount: 1,
          memo: "Shop4Pi Test Payment",
          metadata: { orderId: "order_123" },
        },
        {
          onReadyForServerApproval: async (paymentId: string) => {
            await approvePayment(paymentId);
          },
          onReadyForServerCompletion: async (paymentId: string) => {
            console.log("Payment ready to complete:", paymentId);
          },
          onCancel: () => {
            console.log("Payment cancelled");
          },
          onError: (error: any) => {
            console.error("Payment error", error);
          },
        }
      );

      console.log(payment);
    });
  };

  return <button onClick={payWithPi}>Pay with Pi</button>;
}
