# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY server/. ./

# Expose the port the server listens on
EXPOSE 8000

# Start the server
CMD ["npm", "start"]