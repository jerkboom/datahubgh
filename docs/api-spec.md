# API Specification (Draft)

Base URL: `/api/v1`

## Public Customer Endpoints (No Auth Required)
- `GET /products` (Fetch available bundles)
- `POST /orders/checkout` (Guest purchase init)
  - **Body**: `productId`, `recipientPhone`, `customerName` (opt), `customerPhone` (opt)
  - **Returns**: Paystack URL & Order Reference
- `GET /orders/track`
  - **Query**: `reference` OR `phone`
  - **Returns**: Order Status & Receipt

## Customer Opt-In Auth (Optional)
- `POST /auth/customer/register` (Post-purchase account creation)
- `POST /auth/customer/login`

## Admin Endpoints (JWT Protected)
- `POST /auth/admin/login`
- `GET /admin/analytics`
- `CRUD /admin/products`
- `CRUD /admin/orders`
- `GET /admin/logs`

## Webhooks (Public, Signature Verified)
- `POST /webhooks/paystack` (Server-to-Server)
