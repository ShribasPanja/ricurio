# Database Schema Documentation

## Overview

This Prisma schema tracks user subscriptions and payments for the Recurio Chrome extension, integrated with Dodo Payments.

## Models

### User

Stores user account information.

**Fields:**

- `id`: Unique identifier (CUID)
- `email`: User's email address (unique)
- `name`: User's name (optional)
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

**Relations:**

- `subscriptions`: One-to-many with Subscription
- `payments`: One-to-many with Payment

---

### Subscription

Tracks user subscription status and billing information.

**Fields:**

- `id`: Unique identifier (CUID)
- `userId`: Reference to User
- `dodoCustomerId`: Dodo Payments customer ID (unique)
- `dodoSubscriptionId`: Dodo Payments subscription ID (unique)
- `status`: Subscription status (enum: FREE, ACTIVE, TRIALING, PAST_DUE, CANCELLED, EXPIRED, ON_HOLD)
- `planType`: Plan type (enum: FREE, PRO_MONTHLY, PRO_ANNUAL)
- `billingPeriod`: Billing frequency (enum: MONTHLY, ANNUAL)
- `amount`: Price in cents (e.g., 1900 for $19.00)
- `currency`: Currency code (default: USD)
- `startDate`: Subscription start date
- `currentPeriodStart`: Current billing period start
- `currentPeriodEnd`: Current billing period end
- `cancelledAt`: Cancellation timestamp
- `expiresAt`: Expiration timestamp

**Indexes:**

- userId, dodoCustomerId, dodoSubscriptionId, status

---

### Payment

Records all payment transactions.

**Fields:**

- `id`: Unique identifier (CUID)
- `userId`: Reference to User
- `dodoPaymentId`: Dodo Payments payment ID (unique)
- `dodoCustomerId`: Dodo Payments customer ID
- `status`: Payment status (enum: SUCCEEDED, FAILED, PENDING, PROCESSING, CANCELLED, REFUNDED)
- `amount`: Payment amount in cents
- `currency`: Currency code
- `productId`: Product identifier
- `productName`: Product name
- `planType`: Associated plan type
- `paymentMethod`: Payment method used
- `receiptUrl`: URL to payment receipt
- `description`: Payment description
- `refundedAmount`: Amount refunded in cents
- `refundedAt`: Refund timestamp

**Indexes:**

- userId, dodoPaymentId, dodoCustomerId, status, createdAt

---

### WebhookEvent

Logs all webhook events from Dodo Payments for debugging and processing.

**Fields:**

- `id`: Unique identifier (CUID)
- `eventType`: Type of webhook event (e.g., "payment.succeeded")
- `dodoEventId`: Dodo Payments event ID (unique)
- `payload`: Full webhook payload (JSON)
- `processed`: Whether event has been processed
- `processedAt`: Processing timestamp
- `error`: Error message if processing failed
- `retryCount`: Number of retry attempts

**Indexes:**

- eventType, processed, createdAt

---

## Enums

### SubscriptionStatus

- `FREE`: Free tier user
- `ACTIVE`: Active paid subscription
- `TRIALING`: In trial period
- `PAST_DUE`: Payment failed but subscription still active
- `CANCELLED`: User cancelled subscription
- `EXPIRED`: Subscription expired
- `ON_HOLD`: Subscription on hold

### PlanType

- `FREE`: Free plan (10 imports/day)
- `PRO_MONTHLY`: Pro plan billed monthly ($19/month)
- `PRO_ANNUAL`: Pro plan billed annually ($180/year)

### BillingPeriod

- `MONTHLY`: Billed every month
- `ANNUAL`: Billed once per year

### PaymentStatus

- `SUCCEEDED`: Payment successful
- `FAILED`: Payment failed
- `PENDING`: Payment pending
- `PROCESSING`: Payment being processed
- `CANCELLED`: Payment cancelled
- `REFUNDED`: Payment refunded

---

## Usage Examples

### Create User with Free Subscription

```typescript
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "John Doe",
    subscriptions: {
      create: {
        status: "FREE",
        planType: "FREE",
      },
    },
  },
});
```

### Upgrade to Pro Monthly

```typescript
await prisma.subscription.update({
  where: { userId: user.id },
  data: {
    dodoCustomerId: "cus_xxx",
    dodoSubscriptionId: "sub_xxx",
    status: "ACTIVE",
    planType: "PRO_MONTHLY",
    billingPeriod: "MONTHLY",
    amount: 1900, // $19.00
    startDate: new Date(),
    currentPeriodStart: new Date(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
});
```

### Record Payment

```typescript
await prisma.payment.create({
  data: {
    userId: user.id,
    dodoPaymentId: "pay_xxx",
    dodoCustomerId: "cus_xxx",
    status: "SUCCEEDED",
    amount: 1900,
    currency: "USD",
    productId: "pdt_xxx",
    productName: "Recurio Pro Monthly",
    planType: "PRO_MONTHLY",
  },
});
```

### Log Webhook Event

```typescript
await prisma.webhookEvent.create({
  data: {
    eventType: "payment.succeeded",
    dodoEventId: "evt_xxx",
    payload: webhookPayload,
    processed: true,
    processedAt: new Date(),
  },
});
```

### Check Subscription Status

```typescript
const subscription = await prisma.subscription.findFirst({
  where: {
    userId: user.id,
    status: "ACTIVE",
  },
});

const isPro = subscription?.planType !== "FREE";
```

---

## Setup Instructions

1. **Install Prisma Client:**

   ```bash
   bun add @prisma/client
   bun add -D prisma
   ```

2. **Configure Database URL:**
   Update `.env.local` with your PostgreSQL connection string

3. **Generate Prisma Client:**

   ```bash
   bunx prisma generate
   ```

4. **Run Migrations:**

   ```bash
   bunx prisma migrate dev --name init
   ```

5. **Open Prisma Studio (optional):**
   ```bash
   bunx prisma studio
   ```

---

## Integration with Webhook Handler

The webhook handler should:

1. **On payment.succeeded:**

   - Create/update User record
   - Create/update Subscription record
   - Create Payment record
   - Log WebhookEvent

2. **On subscription.active:**

   - Update Subscription status to ACTIVE
   - Set currentPeriodStart and currentPeriodEnd

3. **On subscription.cancelled:**

   - Update Subscription status to CANCELLED
   - Set cancelledAt timestamp

4. **On subscription.expired:**

   - Update Subscription status to EXPIRED
   - Set expiresAt timestamp

5. **On refund.succeeded:**
   - Update Payment refundedAmount
   - Set refundedAt timestamp
   - Update Subscription status if needed
