import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payment = req.body.payment;
  if (!payment?.identifier || !payment?.transaction?._link) {
    return res.status(400).json({ error: "Invalid payment object" });
  }

  const paymentId = payment.identifier;
  const txid = payment.transaction?.txid;
  const txURL = payment.transaction._link;

  try {
    // Check transaction on Pi blockchain
    const horizon = await axios.get(txURL, { timeout: 20000 });

    if (horizon.data.memo !== paymentId) {
      return res.status(400).json({ error: "Payment ID mismatch" });
    }

    // Notify Pi servers that payment is complete
    await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
        },
      }
    );

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to complete payment" });
  }
}
