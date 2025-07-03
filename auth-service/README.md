# Instagram Clone Backend

A robust backend API for an Instagram clone application built with Express.js and TypeScript.

## Overview

This project provides a scalable and maintainable backend for a social media application similar to Instagram. It includes user authentication, post management, and other essential features for a social media platform.

## Features

- User authentication and authorization with JWT
- RESTful API design
- Middleware for request/response handling
- Error handling and logging
- Security features with Helmet
- CORS configuration
- Compression for optimized responses
- TypeScript for type safety
- Testing with Jest and Supertest

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Programming language
- **PostgreSQL** - Database (via TypeORM)
- **JWT** - Authentication
- **Jest** - Testing framework
- **Winston** - Logging
- **Helmet** - Security
- **Compression** - Response optimization

## Project Structure

```
├── src/
│   ├── app.ts                 # Express application setup
│   ├── index.ts               # Application entry point
│   ├── index.ts              # API routes
│   ├── common/                # Shared resources
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── entity/            # Database entities
│   │   ├── enums/             # Enumerations
│   │   └── publicRoutes.ts    # Public routes configuration
│   ├── config/                # Configuration files
│   │   ├── app.ts             # App configuration
│   │   ├── env.ts             # Environment variables
│   │   └── ...                # Other configurations
│   ├── core/                  # Core functionality
│   │   ├── hashing/           # Password hashing
│   │   ├── logger/            # Logging service
│   │   └── middleware/        # Express middleware
│   ├── features/              # Feature modules
│   └── utils/                 # Utility functions
└── test/                      # Test files
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd instagram-backend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=development
PORT=4000
API_PREFIX=/api/v1
JWT_SECRET=your_jwt_secret

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=instagram
```

## Available Scripts

- `npm start` or `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm test` - Run tests

## API Documentation

### Base URL

```
http://localhost:4000/api/v1
```

### Authentication

- **POST /auth/register** - Register a new user
- **POST /auth/login** - Login and get access token
- **POST /auth/refresh** - Refresh access token

### Users

- **GET /users** - Get all users
- **GET /users/:id** - Get user by ID
- **PUT /users/:id** - Update user
- **DELETE /users/:id** - Delete user

### Posts

- **GET /posts** - Get all posts
- **POST /posts** - Create a new post
- **GET /posts/:id** - Get post by ID
- **PUT /posts/:id** - Update post
- **DELETE /posts/:id** - Delete post

## Testing

This project uses Jest for testing. To run tests:

```bash
npm test
```

For testing in a specific environment:

```bash
cp .env.test.example .env.test
# Edit .env.test with your test configuration
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Aman Khadka
