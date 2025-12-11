import { Webhooks } from "@dodopayments/nextjs";
import { prisma } from "@/lib/prisma";

export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,

  // Handle all webhook events
  onPayload: async (payload) => {
    console.log("Webhook received:", payload.type);
  },

  // Handle successful payments
  onPaymentSucceeded: async (payload) => {
    console.log("Payment succeeded:", payload.data);

    try {
      const { customer } = payload.data;

      if (!customer?.email) {
        console.error("No customer email in payment payload");
        return;
      }

      // Find or create user
      const user = await prisma.user.upsert({
        where: { email: customer.email },
        update: {
          name: customer.name || undefined,
          dodoCustomerId: customer.customer_id || undefined,
        },
        create: {
          email: customer.email,
          name: customer.name || null,
          dodoCustomerId: customer.customer_id || null,
        },
      });

      console.log("User updated after payment:", user.email);
    } catch (error) {
      console.error("Error handling payment success:", error);
    }
  },

  // Handle subscription events
  onSubscriptionActive: async (payload) => {
    console.log("Subscription activated:", payload.data);

    try {
      const { customer, product_id, subscription_id } = payload.data;

      if (!customer?.email) {
        console.error("No customer email in subscription payload");
        return;
      }

      // Calculate expiry date (30 days for monthly)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);

      // Update user subscription
      const user = await prisma.user.upsert({
        where: { email: customer.email },
        update: {
          name: customer.name || undefined,
          dodoCustomerId: customer.customer_id || subscription_id || undefined,
          subscriptionStatus: "ACTIVE",
          planType: "PRO_MONTHLY",
          subscriptionExpiry: expiryDate,
        },
        create: {
          email: customer.email,
          name: customer.name || null,
          dodoCustomerId: customer.customer_id || subscription_id || null,
          subscriptionStatus: "ACTIVE",
          planType: "PRO_MONTHLY",
          subscriptionExpiry: expiryDate,
        },
      });

      console.log("Subscription activated for user:", user.email);
    } catch (error) {
      console.error("Error handling subscription activation:", error);
    }
  },

  onSubscriptionRenewed: async (payload) => {
    console.log("Subscription renewed:", payload.data);

    try {
      const { customer } = payload.data;

      if (!customer?.email) {
        console.error("No customer email in renewal payload");
        return;
      }

      // Extend expiry date by 30 days
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);

      await prisma.user.update({
        where: { email: customer.email },
        data: {
          subscriptionStatus: "ACTIVE",
          subscriptionExpiry: expiryDate,
        },
      });

      console.log("Subscription renewed for user:", customer.email);
    } catch (error) {
      console.error("Error handling subscription renewal:", error);
    }
  },

  onSubscriptionCancelled: async (payload) => {
    console.log("Subscription cancelled:", payload.data);

    try {
      const { customer } = payload.data;

      if (!customer?.email) {
        console.error("No customer email in cancellation payload");
        return;
      }

      await prisma.user.update({
        where: { email: customer.email },
        data: {
          subscriptionStatus: "CANCELLED",
        },
      });

      console.log("Subscription cancelled for user:", customer.email);
    } catch (error) {
      console.error("Error handling subscription cancellation:", error);
    }
  },

  onSubscriptionExpired: async (payload) => {
    console.log("Subscription expired:", payload.data);

    try {
      const { customer } = payload.data;

      if (!customer?.email) {
        console.error("No customer email in expiration payload");
        return;
      }

      await prisma.user.update({
        where: { email: customer.email },
        data: {
          subscriptionStatus: "EXPIRED",
          planType: "FREE",
        },
      });

      console.log("Subscription expired for user:", customer.email);
    } catch (error) {
      console.error("Error handling subscription expiration:", error);
    }
  },
});
