# Start from official Node image
FROM node:22

# Set working directory inside container to match your project structure
# Set working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy tsconfig.json from parent directory
COPY ../tsconfig.json ./tsconfig.json

COPY . ./

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install bcrypt --force

# Make the script executable
WORKDIR /usr/src/app/auth-service

RUN chmod +x start.sh

# Build the project
RUN npm run build

# Expose the correct port
EXPOSE 3000

# Run migrations before starting

# Use shell script as entrypoint
CMD ["./start.sh"]