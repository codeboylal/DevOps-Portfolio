
# V1 - Single-stage build - Working
FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose server port
EXPOSE 8000

# Start the application
CMD ["node", "index.js"]





# #V2 Multi-stage build for optimized size
# FROM node:18 AS builder

# # Set working directory
# WORKDIR /app

# # Install dependencies
# COPY package*.json ./
# RUN npm install --production

# # Copy source code
# COPY . .

# # Final lightweight runtime image
# FROM node:18-slim
# WORKDIR /app

# # Copy only necessary files from builder
# COPY --from=builder /app ./

# # Expose server port
# EXPOSE 8000

# # Start the application
# CMD ["node", "index.js"]




