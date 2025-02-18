# Use official Node.js image with Alpine (lightweight) as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project (except files in .dockerignore)
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the application port
EXPOSE 5001

# Command to start the application
CMD ["npm", "run", "start"]
