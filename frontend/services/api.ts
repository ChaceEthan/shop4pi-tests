import axios from "axios";

const API_BASE = "https://shop4pi-backend.vercel.app/api/payments";

export async function approvePayment(paymentId: string) {
  const response = await axios.post(`${API_BASE}/approve`, { paymentId });
  return response.data;
}

export async function incompletePayment(payment: any) {
  const response = await axios.post(`${API_BASE}/incomplete`, { payment });
  return response.data;
}
