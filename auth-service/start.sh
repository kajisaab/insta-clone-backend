#!/bin/sh

# Exit on any error
set -e

echo "▶ Building TypeScript..."
npm run build

echo "▶ Running TypeORM migrations..."
npm run migration:run

echo "▶ Starting the app..."
npm run start