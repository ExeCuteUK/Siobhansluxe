# Siobhans Luxe - Luxury Cleaning Services Website

## Overview

This is a single-page marketing website for "Siobhans Luxe," a luxury home cleaning and in-house ironing service business operating in Essex, UK. The application is built as a full-stack TypeScript project with a React frontend and Express backend. The primary functionality includes showcasing services, displaying service areas, and handling contact form submissions via email.

## User Preferences

Preferred communication style: Simple, everyday language.

### Content Update Rule
**IMPORTANT**: When updating site content (services, pricing, areas, contact info, meta tags), you MUST update BOTH files:
1. `client/index.html` - Pre-rendered static HTML for LLM crawlers/SEO
2. `client/src/app/App.tsx` - React app for interactive users

This ensures both crawlers without JavaScript and regular visitors see the same content.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: Shadcn/ui component library (New York style) built on Radix UI primitives
- **State Management**: React Query (@tanstack/react-query) for server state
- **Forms**: React Hook Form with Zod validation
- **Design Theme**: Dark luxury theme with gold (#D4AF37) as the primary accent color, using Cinzel font for headings and Lato for body text

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with tsx for development, compiled to CommonJS for production
- **HTTP Server**: Native Node.js http module wrapping Express
- **Build Process**: Custom build script using esbuild for server bundling and Vite for client

### Data Storage
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` contains database table definitions
- **Current Tables**: Users table with id, username, and password fields
- **In-Memory Storage**: MemStorage class in `server/storage.ts` for development/testing
- **Migrations**: Drizzle Kit with migrations output to `./migrations` directory

### API Structure
- **Contact Form Endpoint**: `POST /api/contact` - Sends enquiry emails via SMTP
- **Email Service**: Nodemailer with SMTP configuration (host, port 465, secure connection)
- **Required Environment Variables**: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `DATABASE_URL`

### Project Structure
```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── app/         # Main application components
│   │   │   ├── components/ui/  # Shadcn UI components
│   │   └── styles/      # CSS files (Tailwind, theme, fonts)
│   └── index.html       # Entry HTML with SEO meta tags
├── server/              # Backend Express application
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Data storage abstraction
│   ├── static.ts        # Static file serving for production
│   └── vite.ts          # Vite dev server integration
├── shared/              # Shared code between frontend and backend
│   └── schema.ts        # Drizzle database schema
└── script/              # Build scripts
    └── build.ts         # Production build script
```

### Development vs Production
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Static files served from `dist/public`, server bundle in `dist/index.cjs`

## External Dependencies

### Email Service
- **Provider**: SMTP-based email sending via Nodemailer
- **Configuration**: Requires external SMTP server credentials
- **Recipient**: hello@siobhansluxe.co.uk

### Database
- **Type**: PostgreSQL (configured via DATABASE_URL environment variable)
- **ORM**: Drizzle ORM with drizzle-kit for migrations

### Third-Party UI Libraries
- **Radix UI**: Headless UI primitives for accessible components
- **Material UI**: Additional icon library (@mui/icons-material)
- **Lucide React**: Primary icon set
- **Sonner**: Toast notifications

### Replit-Specific Integrations
- **Vite Plugins**: Runtime error overlay, cartographer, dev banner
- **Meta Images Plugin**: Custom plugin for OpenGraph image handling with Replit domains