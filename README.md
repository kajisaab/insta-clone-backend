# Instagram Clone Backend – Microservices Architecture

A scalable and maintainable microservice-based backend for an Instagram clone built with Node.js, TypeScript, PostgreSQL, Redis, Kafka, and NGINX as an API Gateway.

## 🚀 Overview

This project is an upgraded version of a monolithic backend, now split into domain-specific services following microservice principles. It leverages containerized services for authentication, messaging, and other features with centralized gateway routing and support for horizontal scaling.

---

## 🧩 Architecture

- **Microservices**: Separated by domain (e.g., Auth Service, User Service).
- **API Gateway (NGINX)**: Centralized entry point for all APIs, handles routing and load balancing.
- **Docker Compose**: Manages multi-container orchestration.
- **PostgreSQL**: Each service can optionally have its own database.
- **Redis**: Used for session/token caching.
- **Kafka**: Message brokering between services (e.g., for events like user creation).
- **Swagger**: Auto-generated documentation.

---

## 📦 Tech Stack

- **Node.js & TypeScript** – Core language and runtime
- **Express.js** – Web framework
- **PostgreSQL** – Relational DB via TypeORM
- **Redis** – Caching/session store
- **Kafka** – Event-driven communication
- **NGINX** – API Gateway & load balancing
- **Docker** – Containerization
- **Swagger** – API documentation
- **Helmet, CORS, Compression** – Security and performance
- **Jest** – Testing framework
- **Winston** – Logging

---

## 🏗️ Services Breakdown

```
├── auth-service/             # Authentication and user management
│   ├── src/
│   ├── Dockerfile
│   ├── tsconfig.json
│   └── …
├── nginx/                    # API Gateway configuration
│   └── nginx.conf
├── docker-compose.yml        # Multi-service orchestration
└── …
```

---

## ⚙️ Getting Started

### 🛠️ Prerequisites

- Node.js (v18+ recommended)
- Docker & Docker Compose
- PostgreSQL (if running locally without containers)

---

### 🔧 Setup Instructions

1. **Clone the Repository**

```bash
git clone <repository-url>
cd instagram-backend
```

### Environment Setup

```bash
cp auth-service/.env.example auth-service/.env
# Then update DB, REDIS, JWT, etc. inside .env
```

### Build and Run Services

```bash
docker-compose up --build
```

### NGINX Gateway

Routing is handled via nginx/nginx.conf

```
location /auth/ {
    proxy_pass http://auth;
    rewrite ^/auth(/.*)$ $1 break;
    ...
}
```

Example Routes
• http://localhost/auth/api/v1/auth/login
• http://localhost/auth/api/v1/auth/register

### ✅ Features

    •	🔐 Centralized Authentication with JWT & Cookie-based Auth
    •	🧠 Modular service logic
    •	🚪 API Gateway with Load Balancing (NGINX)
    •	⚡ Redis for token/session caching
    •	📣 Kafka for asynchronous event communication
    •	📃 Swagger Documentation
    •	🧪 Unit and Integration Testing

### 🧪 Scripts

Available Commands (per service)

```bash
# Start dev server
npm run dev

# Build the project
npm run build

# Run DB migrations
npm run migration:run

# Generate migration after entity change
npm run migration:generate

# Revert last migration
npm run migration:revert

# Run tests
npm test
```

### 📚 API Documentation

Once the service starts:

```bash
http://localhost/auth/api-docs
```

Auto-generated via Swagger.

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
