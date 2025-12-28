const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function approvePayment(paymentId: string) {
  const response = await fetch(`${API_BASE}/payments/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentId }),
  });

  if (!response.ok) {
    throw new Error(`Failed to approve payment: ${response.statusText}`);
  }

  return response.json();
}

export async function incompletePayment(payment: any) {
  const response = await fetch(`${API_BASE}/payments/incomplete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payment }),
  });

  if (!response.ok) {
    throw new Error(`Failed to mark payment incomplete: ${response.statusText}`);
  }

  return response.json();
}
