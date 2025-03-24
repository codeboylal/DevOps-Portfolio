
#V1 working

FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose client port
EXPOSE 3000

CMD ["npm", "start"]





# # #V2 Multistaged - For Optimization

# # Use a smaller base image
# FROM node:18-alpine AS builder

# # Set working directory
# WORKDIR /app

# # Install dependencies separately for caching
# COPY package*.json ./
# RUN npm install --production

# # Copy application source code
# COPY . .

# # Build the application (if applicable, e.g., React or Vite projects)
# RUN npm run build

# # Final lightweight runtime image
# FROM nginx:alpine
# WORKDIR /usr/share/nginx/html

# # Copy built files from the builder stage
# COPY --from=builder /app/build .

# # Expose client port
# EXPOSE 3000

# # Default command
# CMD ["nginx", "-g", "daemon off;"]






