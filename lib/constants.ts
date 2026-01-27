export const apiBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const authBaseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

export const paymentBaseUrl =
  process.env.NEXT_PUBLIC_PAYMENT_URL || "http://localhost:5000";
export const transactionSources = [
  "CARD",
  "BANK",
  "APP",
  "PAYPAL",
  "STRIPE",
  "OTHER",
] as const;
export const STEP_META: Record<string, { title: string; description: string }> =
  {
    amount: {
      title: "Send Money",
      description: "Enter the amount you want to send",
    },
    bank: {
      title: "Select Bank",
      description: "Choose the recipient’s bank",
    },
    recipient: {
      title: "Receiver Details",
      description: "Enter the recipient’s information",
    },
    confirm: {
      title: "Confirm Order Information",
      description: "Review and confirm your transfer details",
    },
    payment: {
      title: "Secure Payment",
      description: "You’ll be redirected to complete payment",
    },
    success: {
      title: "Transfer Complete",
      description: "Your transfer was sent successfully",
    },
  };
