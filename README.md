# DataHubGH

Enterprise-grade Data Bundle Platform for Ghana.

## Architecture

This project uses a monorepo structure with Turborepo concepts.

### Apps

- \`web\`: Next.js 15 App Router frontend.
- \`api\`: NestJS robust backend.

### Packages

- \`@datahubgh/ui\`: Shared UI components (Shadcn).
- \`@datahubgh/config\`: Shared configurations (ESLint, Prettier).
- \`@datahubgh/types\`: Shared TypeScript interfaces and Zod schemas.
- \`@datahubgh/utils\`: Shared utility functions.

## Getting Started

1. Clone the repository.
2. Run \`npm install\` at the root.
3. Configure \`.env\` files based on \`.env.example\` in each app.
4. Run \`npm run dev\` to start all applications.
