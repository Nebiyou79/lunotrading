# Use an official Node.js image as the base
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies (like Next.js, Tailwind CSS, etc.)
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Build the Next.js application (creates optimized static files)
RUN npm run build

# Install `serve` to serve the built static files
RUN npm install -g serve

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the application using `serve` on port 3000
CMD ["npm", "run", "start"]