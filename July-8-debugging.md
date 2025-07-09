### **Phase 1: Critical Business Issues**

#### **1.1 Stripe Checkout Address Collection** ✅ COMPLETED
- [x] **Investigate current Stripe session configuration**
  - [x] Check `src/app/api/checkout/route.ts` for address collection settings
  - [x] Verify if `billing_address_collection` or `shipping_address_collection` is enabled
  - [x] Test current checkout flow to see what fields are collected
- [x] **Implement full address collection**
  - [x] Add `shipping_address_collection: 'required'` to Stripe session (US/CA only)
  - [x] Test address collection in Stripe test mode
  - [x] Verify address data is properly captured in webhook
- [x] **Update order processing**
  - [x] Modify webhook to handle shipping address data
  - [x] ~~Store shipping information in order records~~ (Decision: Keep all order data in Stripe only)
  - [x] Test complete order flow with address collection

**Status**: ✅ **WORKING** - Customers now required to enter shipping address for US/CA orders. All order data managed through Stripe Dashboard.

#### **1.2 Inventory Management System**
- Note here: the actual checkout webhook failed on the real transaction. 

**✅ ROOT CAUSE IDENTIFIED**: DNS/SSL Configuration Issue
- **Problem**: Domain `jerry-lester.com` has conflicting A records causing TLS failures
- **Details**: 3 A records present, but `76.76.21.21` has invalid SSL certificate
- **Solution**: Remove problematic A record from GoDaddy DNS management

**🔄 PENDING CLIENT ACTION**: 
- [ ] **Fix GoDaddy DNS Records**
  - [ ] Client to access GoDaddy DNS management for jerry-lester.com
  - [ ] Remove A record pointing to `76.76.21.21`
  - [ ] Keep only Vercel A records (`15.197.225.128`, `3.33.251.168`)
  - [ ] OR switch to CNAME: `cname.vercel-dns.com` (recommended)

**🧪 TESTING PENDING DNS FIX**:
- [ ] Wait 10-30 minutes for DNS propagation
- [ ] Test webhook endpoint: `curl -v https://jerry-lester.com/api/stripe-webhook`
- [ ] Verify SSL Labs shows no errors
- [ ] Test end-to-end checkout with inventory deduction

~~**Debug webhook configuration**~~
  - ~~[ ] Verify Stripe webhook endpoint URL is correct~~
  - ~~[ ] Check webhook secret in environment variables~~
  - ~~[ ] Test webhook signature verification~~
~~**Fix inventory deduction logic**~~
  - ~~[ ] Review `deductInventory` function in `src/app/api/stripe-webhook/route.ts`~~
  - ~~[ ] Add comprehensive logging for debugging~~
  - ~~[ ] Test inventory deduction manually~~
~~**Verify Sanity permissions**~~
  - ~~[ ] Check write client permissions for webhook~~
  - ~~[ ] Test Sanity Studio access and permissions~~
  - ~~[ ] Verify webhook token configuration~~

### **Phase 2: Communication & Notifications**

#### **2.1 Email Notification System** ✅ COMPLETED
- [x] **Investigate Stripe email settings**
  - [x] Check Stripe dashboard for email notification configuration
  - [x] Verify email addresses are correctly set
  - [x] Test email delivery in Stripe test mode
- [x] **Enable Stripe built-in email notifications**
  - [x] Enable "Successful payments" notification toggle in Stripe dashboard
  - [x] Verify customers receive automated order confirmation emails

**Status**: ✅ **WORKING** - Stripe now automatically sends order confirmation emails to customers upon successful payment. No custom email implementation needed.

### **Phase 3: User Experience Improvements**

#### **3.1 Mobile Video Autoplay Optimization**
main problem: the video on the front screen is now just a still image of the press to start whether in low power mode or not (for mobile device), but no issues on desktop the video plays automatically
- [ ] **Analyze current video implementation**
  - [ ] Review `src/components/HeroSection.tsx` autoplay logic
- develop plan to fix 
- implement and test change
- reasoning right now to put on pause "So the difficult thing is that Apple is intentionally unclear to expose when a user's device is in low power mode, so you sort of have to play this cat and mouse game and it gets really tricky. So I think what we had in the past is sort of that play button show up, which I think isn't great in low power mode. Or right now we just have the image the entire time. So, that's sort of the cat and mouse game. So we can decide between those two options, or I can take more time over the next, you know, one to two weeks and see if, just kind of spend more time with this and see if I can dig and find something that will allow us to have a workaround. But there is a difficulty, like these things change each iOS version, you know, depending on people's latest version on their phone, what type of phone they have and stuff like that, like no one really knows for the rhyme or reason."


