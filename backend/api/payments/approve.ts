import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { paymentId } = req.body;

  const response = await axios.get(
    `https://api.minepi.com/v2/payments/${paymentId}`,
    {
      headers: {
        Authorization: `Key ${process.env.PI_API_KEY}`,
      },
    }
  );

  return res.status(200).json({
    approved: true,
    payment: response.data,
  });
}
