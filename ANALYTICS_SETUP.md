# Analytics Setup Guide

Your Gaber website now has analytics tracking implemented! Here's how to complete the setup:

## Option 1: Google Analytics 4 (Recommended for comprehensive tracking)

### Setup Steps:

1. **Create a Google Analytics 4 Property**
   - Go to https://analytics.google.com/
   - Click "Admin" (gear icon in bottom left)
   - Click "Create Property"
   - Follow the setup wizard
   - Copy your Measurement ID (looks like `G-XXXXXXXXXX`)

2. **Add Your Measurement ID**
   - Open `index.html`
   - Find both instances of `GA_MEASUREMENT_ID`
   - Replace with your actual Measurement ID

3. **What's Being Tracked**
   - ✅ Page views
   - ✅ Waitlist form submissions (conversions)
   - ✅ "Join the Waitlist" button clicks
   - ✅ Navigation menu clicks
   - ✅ Section scrolls

4. **View Your Data**
   - Go to Google Analytics dashboard
   - Navigate to Reports > Engagement > Events
   - View custom events: `waitlist_signup`, `button_click`, `navigation_click`

### Privacy Considerations:
- GA4 is GDPR-compliant when configured properly
- Consider adding a cookie consent banner for EU visitors
- Anonymize IP addresses (already configured)

---

## Option 2: Privacy-Friendly Analytics (No cookies, GDPR-compliant by default)

If you prefer a privacy-first approach, consider these alternatives:

### **Plausible Analytics** (Recommended)
- 🟢 No cookies, fully GDPR compliant
- 🟢 Simple, lightweight script
- 🟢 Easy-to-read dashboard
- 💰 $9/month for 10k page views

**Setup:**
1. Sign up at https://plausible.io/
2. Add your domain
3. Replace the Google Analytics script in `index.html` with:
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```
4. Update `src/lib/analytics.ts` to use Plausible's event API:
```typescript
export const trackEvent = (eventName: string, props?: Record<string, any>) => {
  if (typeof window.plausible === 'undefined') return;
  window.plausible(eventName, { props });
};
```

### **Other Privacy-Friendly Options:**
- **Fathom Analytics**: https://usefathom.com/ ($14/month)
- **Simple Analytics**: https://simpleanalytics.com/ (€19/month)
- **Umami**: https://umami.is/ (Free, self-hosted or $9/month cloud)

---

## Custom Supabase Analytics (Free, Complete Privacy)

Since you're using Lovable Cloud, you could also track analytics directly in your Supabase database:

### Implementation:
1. Create an `analytics_events` table:
```sql
CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_data JSONB,
  page_url TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

2. Update `src/lib/analytics.ts` to insert events into Supabase
3. Create a simple dashboard in your admin panel to view metrics

**Pros:** Free, complete data ownership, no third-party tracking
**Cons:** Need to build your own reporting dashboard

---

## Conversion Goals to Track

The following key conversions are already implemented:

1. **Waitlist Signups** (`waitlist_signup`)
   - Fired when form is successfully submitted
   - Most important conversion metric

2. **Button Clicks** (`button_click`)
   - "Join the Waitlist" CTA clicks
   - Tracks user intent

3. **Navigation Clicks** (`navigation_click`)
   - What is Gaber?
   - Our Vision
   - Join button in header

4. **Section Views** (ready to implement)
   - Uncomment section tracking in `src/pages/Index.tsx`

---

## Testing Your Analytics

1. **Install Google Analytics Debugger** (Chrome Extension)
2. Visit your website
3. Perform actions (click buttons, submit form)
4. Check the extension to verify events are firing
5. Wait 24-48 hours for data to appear in GA4 dashboard

---

## Need Help?

- Google Analytics Help: https://support.google.com/analytics
- Plausible Docs: https://plausible.io/docs
- Or ask in the Lovable Discord community!
