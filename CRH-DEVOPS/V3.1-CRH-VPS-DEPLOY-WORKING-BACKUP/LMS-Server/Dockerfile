# Use a Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependencies installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the entire application
COPY . .

# Expose the application port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
