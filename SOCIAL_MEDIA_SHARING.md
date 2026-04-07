# Social Media Sharing & Open Graph Setup

## Quick Links (Click to Test)

**Test Your Preview:**
- [Facebook Debugger](https://developers.facebook.com/tools/debug/sharing/) - See how it looks on Facebook
- [Twitter Card Validator](https://cards-dev.twitter.com/validator/) - See how it looks on Twitter/X
- [LinkedIn Inspector](https://www.linkedin.com/post-inspector/inspect/) - See how it looks on LinkedIn
- [Open Graph Debugger](https://ogp.me/) - General Open Graph tag checker

**Your Production URL:** `https://toptobottomcleaning.netlify.app`

---

## Overview
This document explains how social media previews are configured and how to test them.

## Current Setup

### Metadata Base
- **Production URL**: `https://toptobottomcleaning.netlify.app`
- **Location**: `app/layout.tsx`

### Social Media Preview Content
When someone shares your website link on social media, this information appears:

| Field | Value |
|-------|-------|
| **Title** | Top To Bottom Cleaning Services - Professional Cleaning |
| **Description** | Get your instant cleaning quote today. Fast, easy, and transparent pricing for all your cleaning needs. |
| **Image** | `/og-image.png` (1200x630 pixels) |

### Supported Platforms
- Facebook
- Twitter/X
- LinkedIn
- WhatsApp
- Slack
- And other social platforms that support Open Graph tags

## Required Files

### 1. Open Graph Image
- **Location**: `/public/og-image.png`
- **Size**: 1200x630 pixels
- **Format**: PNG
- **Purpose**: The image shown in social media previews
- **Status**: ⚠️ Check if this file exists in your public folder

### 2. Configuration Files
- **Metadata config**: `app/layout.tsx` (lines 24-49)
- **Viewport config**: `app/layout.tsx` (lines 20-22)

## How to Test

### Facebook Share Debugger
1. Go to: https://developers.facebook.com/tools/debug/sharing/
2. Paste your URL: `https://toptobottomcleaning.netlify.app`
3. Click "Scrape Again" to see preview
4. Verify title, description, and image appear correctly

### Twitter Card Validator
1. Go to: https://cards-dev.twitter.com/validator/
2. Paste your URL: `https://toptobottomcleaning.netlify.app`
3. Verify the preview matches your settings

### LinkedIn Post Inspector
1. Go to: https://www.linkedin.com/post-inspector/inspect/
2. Paste your URL: `https://toptobottomcleaning.netlify.app`
3. Check the preview

### Open Graph General Debugger
- Universal tool: https://ogp.me/
- Test any page meta tags
- Paste your URL to verify all Open Graph tags

## What You'll See in Social Media

### Example Facebook Share
```
[IMAGE: og-image.png]
Top To Bottom Cleaning Services - Professional Cleaning
Get your instant cleaning quote today. Fast, easy, and transparent pricing for all your cleaning needs.
toptobottomcleaning.netlify.app
```

## Color Scheme
- **Theme Color**: `#48546A` (dark grayish-blue)
- **Brand Colors**: Used throughout the app

## Next Steps

### If og-image.png is Missing
1. Create a 1200x630px image with:
   - Your brand colors (#48546A)
   - Company name/logo
   - Service description or call-to-action
2. Save as `public/og-image.png`
3. Push to production and test again (5-10 min cache delay)

### If Preview Doesn't Update
- Social platforms cache previews for 5-10 minutes
- Use the debugger tools above to force a refresh
- Check that image dimensions are exactly 1200x630px

## References
- [Meta Open Graph Documentation](https://ogp.me/)
- [Next.js Metadata Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Open Graph Debugger](https://developers.facebook.com/tools/debug/sharing)
