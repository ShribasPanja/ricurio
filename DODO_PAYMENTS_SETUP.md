# Dodo Payments Integration Guide

## Setup Complete! ✅

Your Recurio website is now integrated with Dodo Payments for subscription management.

## What's Been Configured

### 1. Environment Variables

File: `.env.local`

- `DODO_PAYMENTS_API_KEY` - Your Dodo Payments API key
- `DODO_PAYMENTS_WEBHOOK_KEY` - Webhook secret for verification
- `DODO_PAYMENTS_RETURN_URL` - Success redirect URL
- `DODO_PAYMENTS_ENVIRONMENT` - "test_mode" or "live_mode"

### 2. API Routes Created

#### Checkout Handler

File: `src/app/api/checkout/route.ts`

- **GET** `/api/checkout?productId=YOUR_PRODUCT_ID` - Static checkout links
- **POST** `/api/checkout` - Checkout sessions with cart support

#### Webhook Handler

File: `src/app/api/webhook/dodo-payments/route.ts`

- Endpoint: `/api/webhook/dodo-payments`
- Handles payment events: success, failed, refund, subscription changes
- Includes signature verification for security

### 3. Success Page

File: `src/app/checkout/success/page.tsx`

- Beautiful confirmation page
- Lists Pro features
- Call-to-action to open extension

### 4. Pricing Page Integration

File: `src/app/page.tsx`

- Monthly plan button connected to checkout API
- Annual plan button connected to checkout API
- Placeholders for product IDs

## Next Steps

### 1. Get Your Dodo Payments Credentials

1. Sign up at [app.dodopayments.com](https://app.dodopayments.com/signup)
2. Navigate to Settings > API Keys
3. Copy your API Key and Webhook Secret
4. Update `.env.local` with real values

### 2. Create Your Products

1. Go to Dodo Payments Dashboard
2. Click "Products" > "Create Product"
3. Create two subscription products:

**Monthly Plan:**

- Name: Recurio Pro Monthly
- Type: Subscription
- Price: $19/month
- Copy the Product ID (format: `pdt_xxxxx`)

**Annual Plan:**

- Name: Recurio Pro Annual
- Type: Subscription
- Price: $180/year (or $15/month billed annually)
- Copy the Product ID (format: `pdt_xxxxx`)

### 3. Update Product IDs

In `src/app/page.tsx`, replace placeholders:

```typescript
// Line ~660 - Monthly Plan
const productId = "YOUR_MONTHLY_PRODUCT_ID"; // Replace with actual ID

// Line ~805 - Annual Plan
const productId = "YOUR_ANNUAL_PRODUCT_ID"; // Replace with actual ID
```

### 4. Configure Webhook in Dodo Dashboard

1. Go to Settings > Webhooks
2. Add new webhook endpoint: `https://yourdomain.com/api/webhook/dodo-payments`
3. Select events to listen for:
   - `payment.succeeded`
   - `payment.failed`
   - `subscription.active`
   - `subscription.renewed`
   - `subscription.cancelled`
   - `subscription.expired`
   - `refund.succeeded`

### 5. Test in Test Mode

1. Set `DODO_PAYMENTS_ENVIRONMENT=test_mode`
2. Use test product IDs
3. Click pricing buttons to test checkout flow
4. Use Dodo's test card: `4242 4242 4242 4242`
5. Verify webhook events are received

### 6. Implement Business Logic

Update `src/app/api/webhook/dodo-payments/route.ts` to:

```typescript
onPaymentSucceeded: async (payload) => {
  // TODO: Your implementation
  // 1. Extract customer email from payload.data
  // 2. Update database with subscription status
  // 3. Grant Pro access in Chrome extension
  // 4. Send confirmation email
},

onSubscriptionCancelled: async (payload) => {
  // TODO: Your implementation
  // 1. Revoke Pro access
  // 2. Update database
  // 3. Send cancellation email
},
```

### 7. Go Live

1. Change `DODO_PAYMENTS_ENVIRONMENT=live_mode`
2. Replace test product IDs with live IDs
3. Update webhook URL to production domain
4. Test with real payment method
5. Monitor webhook logs in Dodo Dashboard

## Features Included

✅ **Static Checkout Links** - Direct product purchase URLs
✅ **Checkout Sessions** - Multi-product cart support  
✅ **Webhook Handling** - Automated event processing
✅ **Success Page** - Beautiful post-purchase experience
✅ **Test Mode** - Safe testing before going live
✅ **Signature Verification** - Secure webhook validation

## Pricing Plans Configuration

Current setup:

- **Free**: No payment, extension only
- **Pro Monthly**: $19/month - needs product ID
- **Pro Annual**: $180/year ($15/month) - needs product ID

## Support

- **Dodo Payments Docs**: https://docs.dodopayments.com
- **API Reference**: https://docs.dodopayments.com/api-reference
- **Discord Community**: https://discord.gg/bYqAp4ayYh
- **Support Email**: support@dodopayments.com

## Security Notes

⚠️ **Important:**

- Never commit `.env.local` to git (already in .gitignore)
- Always verify webhook signatures
- Use environment variables for all secrets
- Test thoroughly in test mode before going live
- Monitor webhook logs for issues

## Additional Resources

- [Next.js Adapter Docs](https://docs.dodopayments.com/developer-resources/nextjs-adaptor)
- [Webhook Events Reference](https://docs.dodopayments.com/api-reference/webhooks)
- [Checkout Sessions Guide](https://docs.dodopayments.com/developer-resources/checkout-session)
