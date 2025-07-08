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
- [ ] **Analyze current video implementation**
  - [ ] Review `src/components/HeroSection.tsx` autoplay logic
  - [ ] Check video file for audio tracks (should be removed)
  - [ ] Verify video attributes (`playsInline`, `webkit-playsinline`)
- [ ] **Implement video optimization**
  - [ ] Remove audio from video file using FFmpeg
  - [ ] Add multiple codec support (H.264 + HEVC)
  - [ ] Implement intersection observer for better autoplay
- [ ] **Add fallback mechanisms**
  - [ ] Detect low power mode and data saver settings
  - [ ] Implement graceful fallback to poster image
  - [ ] Test on various mobile devices and browsers

#### **3.2 Content Management Enhancements**
- [ ] **Add reordering functionality for products**
  - [ ] Add `displayOrder` field to product schema
  - [ ] Update product queries to sort by display order
  - [ ] Test reordering in Sanity Studio
- [ ] **Add reordering functionality for portfolio**
  - [ ] Add `displayOrder` field to portfolio schema
  - [ ] Update portfolio queries to sort by display order
  - [ ] Test reordering in Sanity Studio
- [ ] **Fix duplicate playlist issue**
  - [ ] Review `src/app/listen/page.tsx` for duplicate iframes
  - [ ] Remove duplicate April playlist
  - [ ] Verify all playlists display correctly

### **Phase 4: Testing & Quality Assurance**

#### **4.1 Comprehensive Testing**
- [ ] **Set up test environment**
  - [ ] Configure Stripe test mode for all testing
  - [ ] Create test products for order flow testing
  - [ ] Set up test email addresses
- [ ] **End-to-end order flow testing**
  - [ ] Test complete order process from product selection to completion
  - [ ] Verify inventory updates in real-time
  - [ ] Test email notifications in test mode
  - [ ] Verify address collection and storage
- [ ] **Cross-device testing**
  - [ ] Test video autoplay on various mobile devices
  - [ ] Test checkout flow on different browsers
  - [ ] Verify responsive design across devices

#### **4.2 Performance & Monitoring**
- [ ] **Add comprehensive logging**
  - [ ] Implement structured logging for all critical operations
  - [ ] Add error tracking and monitoring
  - [ ] Set up alerts for failed webhooks or orders
- [ ] **Performance optimization**
  - [ ] Optimize video loading and autoplay
  - [ ] Improve page load times
  - [ ] Add caching strategies where appropriate

### **Phase 5: Documentation & Handover**

#### **5.1 Documentation**
- [ ] **Update technical documentation**
  - [ ] Document Stripe integration and webhook setup
  - [ ] Create troubleshooting guide for common issues
  - [ ] Document environment variables and configuration
- [ ] **Create user guides**
  - [ ] Guide for managing products and inventory
  - [ ] Guide for managing portfolio items
  - [ ] Guide for monitoring orders and notifications

#### **5.2 Client Training**
- [ ] **Prepare client training materials**
  - [ ] Create video tutorials for Sanity Studio usage
  - [ ] Prepare FAQ document for common questions
  - [ ] Set up support channels and escalation procedures

### **Ongoing Maintenance Tasks**

#### **6.1 Regular Monitoring**
- [ ] **Set up monitoring dashboards**
  - [ ] Monitor webhook success rates
  - [ ] Track order completion rates
  - [ ] Monitor email delivery rates
- [ ] **Regular health checks**
  - [ ] Weekly testing of critical user flows
  - [ ] Monthly review of error logs
  - [ ] Quarterly performance audits

#### **6.2 Future Enhancements**
- [ ] **Consider additional features**
  - [ ] Order tracking system
  - [ ] Customer account management
  - [ ] Advanced inventory management
  - [ ] Analytics and reporting dashboard

### **Success Metrics & KPIs**

- [ ] **Order completion rate**: Target >95%
- [ ] **Inventory accuracy**: Target 100%
- [ ] **Email delivery rate**: Target >98%
- [ ] **Mobile video autoplay success**: Target >90%
- [ ] **Page load times**: Target <3 seconds
- [ ] **Client satisfaction**: Target >4.5/5

This structured todo list provides a comprehensive roadmap for addressing all the client feedback issues systematically, with clear phases, priorities, and success metrics. Each phase builds upon the previous one, ensuring that critical business issues are resolved first before moving on to user experience improvements.