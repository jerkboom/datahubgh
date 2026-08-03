# Software Architecture Document

## Overview
DataHubGH is designed as a scalable SaaS application leveraging a Monorepo strategy (Turborepo conventions) to maintain strict boundaries between the Next.js frontend (`apps/web`) and the NestJS backend (`apps/api`), alongside shared internal packages (`packages/*`).

## Clean Architecture Abstractions

To ensure long-term maintainability, external services are decoupled from the core business logic using Dependency Injection (DI) and interface abstractions.

### 1. Payment Processing Abstraction
The payment layer is completely independent of product delivery and business logic.
- **Interface**: `PaymentProvider` (Methods: `initializePayment`, `verifyPayment`)
- **Implementations**: `PaystackProvider`, `KorapayProvider`
- **Resolution**: Only one provider is registered at runtime, controlled entirely by an environment variable (e.g., `PAYMENT_GATEWAY=paystack`). This allows hot-swapping gateways without touching core code.

### 2. Product Delivery Abstraction
The actual delivery of data/airtime to the customer's phone is decoupled from payment verification.
- **Interface**: `DeliveryProvider` (Methods: `deliverProduct`, `checkDeliveryStatus`)
- **Implementations**: Configurable based on the chosen vendor (e.g., `HubtelDeliveryProvider`, `ManualDeliveryProvider`).
- **Flow Separation**: The Webhook verifies payment -> Updates Order Status -> Passes the Order to the `DeliveryProvider`.

## Folder Structure

### Root Directory
- `apps/`: Contains the deployable applications.
- `packages/`: Contains shared internal libraries.
- `docs/`: Comprehensive project documentation.
- `docker/`: Dockerfiles and docker-compose for infrastructure.
- `.github/`: CI/CD pipelines (GitHub Actions).

### apps/web (Next.js 15)
- `src/app/`: Next.js App Router structure.
- `src/components/`: Reusable UI components (Shadcn).
- `src/hooks/`, `src/services/`, `src/store/`: Client-side logic.

### apps/api (NestJS)
- `src/modules/`: Feature-based modules (Auth, Users, Products, etc.).
- `src/common/`: Global guards, interceptors, and filters.
- `src/config/`: Environment configuration.

### packages/*
- `@datahubgh/ui`: Shared UI components across frontend interfaces.
- `@datahubgh/config`: Prettier, ESLint, Tailwind configs.
- `@datahubgh/types`: Shared TypeScript interfaces and Zod schemas used by both API and Web.

## Deployment Architecture
- **Frontend**: Vercel (Edge computing, caching, seamless Next.js support).
- **Backend**: Render, AWS Elastic Beanstalk, or DigitalOcean App Platform (Node.js Docker container).
- **Database**: MongoDB Atlas (Managed DBaaS).
- **Assets**: Cloudinary (Image management).
