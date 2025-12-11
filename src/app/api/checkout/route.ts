import { Checkout } from "@dodopayments/nextjs";

// Static checkout via GET request with productId query param
export const GET = Checkout({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  returnUrl: process.env.DODO_PAYMENTS_RETURN_URL,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode",
  type: "static",
});

// Checkout sessions via POST (recommended for cart-based checkouts)
export const POST = Checkout({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  returnUrl: process.env.DODO_PAYMENTS_RETURN_URL,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode",
  type: "session",
});
