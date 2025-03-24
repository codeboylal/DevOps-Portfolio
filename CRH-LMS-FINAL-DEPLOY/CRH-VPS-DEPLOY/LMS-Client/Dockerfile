

# Working
# Stage 1: Build the React app
FROM node:18-alpine AS build-stage
WORKDIR /app

# Install dependencies only when package.json or package-lock.json changes
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code and build it
COPY . .
RUN npm run build

# Stage 2: Serve the built files using NGINX
FROM nginx:1.25-alpine AS production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Copy custom nginx.conf to handle routing (client-side navigation)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the necessary port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]