# Readiness Checklists

## Security
- [ ] JWT signed with strong secret.
- [ ] Refresh tokens stored securely (HttpOnly cookies).
- [ ] Helmet configured for HTTP headers.
- [ ] Global Rate Limiting enabled (express-rate-limit/Throttler).
- [ ] Input Validation strict via Class-Validator / Zod.
- [ ] Passwords hashed using Bcrypt.
- [ ] Paystack Webhooks validated using signature verification.
- [ ] Role Guards applied to all Admin routes.

## Performance
- [ ] Database queries indexed on common lookups (email, phone, order status).
- [ ] Next.js images optimized via Cloudinary and `next/image`.
- [ ] React components lazy-loaded where appropriate.
- [ ] Backend caching for product catalog (Redis future-proofing).
- [ ] Payload compression enabled via `compression`.

## Production Readiness
- [ ] Environment variables validated on startup.
- [ ] Global Exception Filter capturing all 500s.
- [ ] PM2 / Docker health checks configured.
- [ ] Morgan logging enabled for request tracing.
- [ ] CI/CD pipeline tests passing.
