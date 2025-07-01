# Detectron

A modern web application with authentication and social media content analysis capabilities.

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Radix UI components with shadcn/ui
- React Query for data fetching
- React Hook Form with Zod validation
- Wouter for routing

### Backend
- Express.js
- MongoDB as database
- Passport.js with Local Strategy authentication
- Express Session with PostgreSQL store
- Zod for schema validation
- TypeScript

## Features

- User authentication with session management
- Social media content analysis
- Protected routes
- Form validation with CAPTCHA
- Modern and responsive UI components
- Type-safe API endpoints
- Hot module replacement in development

## Prerequisites

- Node.js (v20 or later)
- MongoDB database
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd detectron
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
```

4. Push the database schema:
```bash
npm run db:push
```

## Development

To run the application in development mode:

```bash
npm run dev
```

This will start both the frontend and backend in development mode with hot reloading.

## Production Build

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utility functions
│   │   └── pages/      # Page components
├── server/           # Backend Express application
│   ├── auth.ts       # Authentication logic
│   ├── analysis.ts   # Content analysis
│   ├── routes.ts     # API routes
│   └── storage.ts    # Database operations
└── shared/           # Shared TypeScript types and schemas
```

## License

MIT