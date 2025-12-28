import axios from "axios";
import { Router } from "express";
import platformAPIClient from "../services/platformAPIClient";
import "../types/session";

export default function mountPaymentsEndpoints(router: Router) {

  // Pi calls this when payment is incomplete
  router.post("/incomplete", async (req, res) => {
    const payment = req.body.payment;
    const paymentId = payment.identifier;
    const txid = payment.transaction?.txid;
    const txURL = payment.transaction?._link;

    // check transaction on Pi blockchain
    const horizonResponse = await axios.create({ timeout: 20000 }).get(txURL);
    const paymentIdOnBlock = horizonResponse.data.memo;

    if (paymentIdOnBlock !== paymentId) {
      return res.status(400).json({ message: "Payment id mismatch" });
    }

    // notify Pi servers payment is complete
    await platformAPIClient.post(
      `/v2/payments/${paymentId}/complete`,
      { txid }
    );

    return res.status(200).json({ message: "Payment completed" });
  });

  // User approves the payment
  router.post("/approve", async (req, res) => {
    if (!req.session?.currentUser) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const { paymentId } = req.body;

    const currentPayment = await platformAPIClient.get(
      `/v2/payments/${paymentId}`
    );

    // here you would save order in DB (optional)

    return res.status(200).json({
      approved: true,
      payment: currentPayment.data
    });
  });
}
