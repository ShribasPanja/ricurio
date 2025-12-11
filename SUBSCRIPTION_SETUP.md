# Dodo Payments $9 Subscription Setup

## Quick Setup Guide

### 1. Create Product in Dodo Payments

1. Go to [app.dodopayments.com](https://app.dodopayments.com)
2. Navigate to **Products** > **Create Product**
3. Fill in the details:
   - **Name**: Recurio Pro Monthly
   - **Type**: Subscription
   - **Price**: $9.00 USD
   - **Billing Period**: Monthly (30 days)
   - **Description**: Unlimited LinkedIn profile imports and advanced features
4. Click **Create Product**
5. **Copy the Product ID** (format: `pdt_xxxxxxxxxxxxx`)

### 2. Update Product ID in Code

Open `src/components/SubscriptionModal.tsx` and replace:

```typescript
// Line ~196
const productId =
  planType === "monthly"
    ? "YOUR_MONTHLY_PRODUCT_ID" // Replace with actual product ID
    : "YOUR_ANNUAL_PRODUCT_ID";
```

With your actual product ID:

```typescript
const productId =
  planType === "monthly"
    ? "pdt_xxxxxxxxxxxxx" // Your actual Dodo product ID
    : "YOUR_ANNUAL_PRODUCT_ID";
```

### 3. Configure Environment Variables

Update `.env.local` with your Dodo Payments credentials:

```env
DODO_PAYMENTS_API_KEY=your-api-key-here
DODO_PAYMENTS_WEBHOOK_KEY=your-webhook-secret-here
DODO_PAYMENTS_RETURN_URL=http://localhost:3000/checkout/success
DODO_PAYMENTS_ENVIRONMENT=test_mode
```

### 4. Set Up Webhook

1. In Dodo Payments Dashboard, go to **Settings** > **Webhooks**
2. Add webhook endpoint: `https://yourdomain.com/api/webhook/dodo-payments`
3. Select events:
   - ✅ `payment.succeeded`
   - ✅ `subscription.active`
   - ✅ `subscription.renewed`
   - ✅ `subscription.cancelled`
   - ✅ `subscription.expired`
   - ✅ `refund.succeeded`

### 5. Test Flow

1. **Start dev server**: `bun dev`
2. **Click "Get Monthly Plan"** on pricing page
3. **Enter email** in modal
4. **If user doesn't exist**: Message says "Please login to extension first"
5. **Create test user** (if needed):
   ```bash
   curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "name": "Test User"}'
   ```
6. **Try again** - now shows user info
7. **Click "Proceed to Payment"**
8. **Use Dodo test card**: `4242 4242 4242 4242`
9. **Webhook fires** → Database updates automatically

## What Happens When Payment Succeeds

The webhook handler (`/api/webhook/dodo-payments/route.ts`) automatically:

1. **Receives webhook** from Dodo Payments
2. **Extracts customer email** from payload
3. **Updates database** via Prisma:
   ```typescript
   {
     subscriptionStatus: "ACTIVE",
     planType: "PRO_MONTHLY",
     subscriptionExpiry: new Date(+30 days),
     dodoCustomerId: "cus_xxx"
   }
   ```
4. **Logs success** to console

## Database Schema

User table stores:

```typescript
{
  id: string
  email: string (unique)
  name: string?
  dodoCustomerId: string? (unique)
  subscriptionStatus: "FREE" | "ACTIVE" | "CANCELLED" | "EXPIRED"
  planType: "FREE" | "PRO_MONTHLY" | "PRO_ANNUAL"
  subscriptionExpiry: Date?
  createdAt: Date
  updatedAt: Date
}
```

## Webhook Events Handled

| Event                    | Action                                                             |
| ------------------------ | ------------------------------------------------------------------ |
| `payment.succeeded`      | Create/update user with customer info                              |
| `subscription.active`    | Set status to ACTIVE, planType to PRO_MONTHLY, set expiry +30 days |
| `subscription.renewed`   | Extend expiry by 30 days, keep ACTIVE status                       |
| `subscription.cancelled` | Set status to CANCELLED                                            |
| `subscription.expired`   | Set status to EXPIRED, planType to FREE                            |
| `refund.succeeded`       | Set status to CANCELLED, planType to FREE                          |

## Testing in Production

1. Change environment: `DODO_PAYMENTS_ENVIRONMENT=live_mode`
2. Replace test product ID with live product ID
3. Update webhook URL to production domain
4. Test with real payment method
5. Monitor webhooks in Dodo Dashboard

## Troubleshooting

**Webhook not firing?**

- Check webhook URL is publicly accessible (use ngrok for local testing)
- Verify webhook secret matches `.env.local`
- Check Dodo Dashboard > Webhooks for delivery logs

**Database not updating?**

- Check console logs for errors
- Verify DATABASE_URL is correct
- Run `bunx prisma db push` to sync schema
- Check Prisma is properly installed

**User not found in modal?**

- User must be created first (via extension or `/api/users`)
- Email must match exactly (case-sensitive)

## Next Steps

1. ✅ Create product in Dodo Payments
2. ✅ Update product ID in code
3. ✅ Configure environment variables
4. ✅ Set up webhook endpoint
5. ✅ Test with test mode
6. ✅ Go live with production credentials
