
# Working 

# Stage 1: Install dependencies
FROM node:18-alpine AS build-stage
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps --omit=dev

# Copy the application source code
COPY . .

# Stage 2: Production-ready server
FROM node:18-alpine AS production-stage
WORKDIR /usr/src/app

# Copy built dependencies and source files from the previous stage
COPY --from=build-stage /usr/src/app /usr/src/app

# Expose the server port
EXPOSE 5000

# Run the Node.js application
CMD ["node", "server.js"]


