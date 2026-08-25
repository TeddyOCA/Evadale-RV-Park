# Overview

Evadale RV Park is a React-based RV reservation system built with a full-stack TypeScript architecture. The application enables users to book RV spots through a multi-step reservation form while providing administrators with a dashboard to manage bookings. The system captures comprehensive RV details, contact information, and electrical requirements to ensure proper campground resource allocation.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **UI Components**: Shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: React Hook Form for form state with Zod schema validation
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

## Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints following conventional HTTP methods
- **Data Storage**: In-memory storage with interface abstraction for future database migration
- **Validation**: Shared Zod schemas between client and server for type safety

## Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL with schema-first approach
- **Schema Management**: Centralized schema definitions in shared directory
- **Migration Strategy**: Drizzle Kit for schema migrations and database introspection
- **Connection**: Neon Database serverless PostgreSQL (configured but using memory storage currently)

## Form Architecture
- **Multi-Step Process**: 4-step reservation form (Contact Info → RV Details → Electrical → Review)
- **Progressive Enhancement**: Step-by-step validation with visual progress indicators
- **Data Persistence**: Form state maintained throughout the process with validation at each step
- **User Experience**: Success confirmation with visual feedback and loading states

## Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Development Experience**: Hot module replacement and runtime error overlay
- **Path Resolution**: Absolute imports with @ aliases for clean import paths

# External Dependencies

## UI and Styling
- **Radix UI**: Headless component primitives for accessibility and keyboard navigation
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe variant API for component styling

## Data Management
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Runtime type validation and schema inference
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL dialect

## Development and Runtime
- **Vite**: Fast build tool with HMR and optimized production builds
- **Express.js**: Minimal web framework for API endpoints
- **Date-fns**: Date utility library for date formatting and manipulation
- **Neon Database**: Serverless PostgreSQL platform for production data storage

## Session and Storage
- **Connect-pg-simple**: PostgreSQL session store for Express sessions
- **Crypto**: Node.js built-in module for generating UUIDs and secure tokens

## Development Experience
- **Replit Integration**: Development banner and cartographer plugin for Replit environment
- **Runtime Error Overlay**: Development-time error visualization
- **TypeScript**: Full type safety across client, server, and shared code