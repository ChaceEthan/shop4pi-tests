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
  const paymentId = payment.identifier;
  const txid = payment.transaction?.txid;
  const txURL = payment.transaction?._link;

  const horizon = await axios.get(txURL);
  if (horizon.data.memo !== paymentId) {
    return res.status(400).json({ error: "Payment mismatch" });
  }

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
}
