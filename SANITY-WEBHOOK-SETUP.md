# Sanity CMS Webhook Setup for Vercel

This guide explains how to set up automatic content revalidation when you make changes in Sanity CMS.

## How It Works

1. When you publish content in Sanity, it sends a webhook to your Next.js app
2. The webhook triggers immediate revalidation of the affected pages
3. Your site updates instantly with the new content

## Setup Instructions

### 1. Set Up Environment Variable in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add a new environment variable:
   - **Name**: `REVALIDATION_TOKEN`
   - **Value**: Generate a secure random string (use a password generator)
4. Make sure to select all environments (Production, Preview, Development)
5. Save the environment variable

### 2. Set Up Webhook in Sanity

1. Go to your Sanity project dashboard at [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Navigate to **API** > **Webhooks**
4. Create a new webhook:
   - **Name**: "Vercel Revalidation"
   - **URL**: `https://your-vercel-domain.com/api/revalidate` (replace with your actual domain)
   - **HTTP method**: POST
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type in ["product", "portfolio"]`
   - **Headers**: Add a custom header `x-webhook-token` with the same value as your `REVALIDATION_TOKEN`
   - **Projection**: Include at minimum `{_id, _type}`

### 3. Test the Webhook

1. Make a change to a product or portfolio item in Sanity Studio
2. Publish the change
3. Check your Vercel logs to see if the webhook was received
4. Verify that your site updates with the new content immediately

## Troubleshooting

- **Webhook not triggering**: Check the webhook URL and make sure it's accessible
- **Authentication errors**: Verify that the token in Sanity matches the one in Vercel
- **Revalidation not working**: Check Vercel logs for any errors in the revalidation API route

## Additional Information

- The site still uses ISR with a 1-hour cache for normal visitors
- The webhook bypasses this cache for immediate updates
- Only changed content triggers revalidation, keeping your site efficient 