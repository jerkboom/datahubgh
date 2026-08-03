# Business Logic & Rules

## 1. Core Philosophy: Speed & Convenience
DataHubGH operates as a digital vending platform, prioritizing friction-free purchases. 
- **Guest Checkout First**: Customers DO NOT need an account to buy products.
- **Fast Flow**: Purchase must be completed in under 60 seconds.
- **Optional Accounts**: Only after a successful purchase, customers are offered the option to create an account for history and rewards.

## 2. Roles & Permissions
- **Guest Customer**: Can buy data, buy airtime, check WAEC, view order status, contact support, and download receipts using tracking details (Phone Number, Order ID, Payment Ref).
- **Registered Customer**: Voluntary opt-in. Gains access to Purchase History, Saved Numbers, Favorite Products, Faster Checkout, and Referral Rewards.
- **Super Admin**: Full access to all systems.
- **Admin**: Can manage products, view analytics, and manage orders. 
- **Support Agent**: View-only access to orders to assist customers.

## 3. The Customer Purchase Flow (Guest Default)
1. Landing Page / Select Product
2. Choose Package (e.g., 10GB)
3. Enter Recipient Phone Number
4. (Optional) Enter Name and Own Phone Number
5. Pay with MoMo / Card
6. Success Page & Receipt Delivery

## 4. Order Tracking System
Customers can look up their orders via an open "Track Order" portal by entering:
- Phone Number
- Order Number / Payment Reference

## 5. Admin Authentication
Admin routes are strictly protected by:
- JWT Access & Refresh Tokens
- Role-Based Access Control (RBAC)
- Activity & Audit Logging
