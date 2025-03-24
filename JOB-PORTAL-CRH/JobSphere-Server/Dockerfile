
FROM node:18 AS dependencies

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production


FROM node:18-alpine
WORKDIR /app

# Copy only production dependencies and source code
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Set environment variable for production
ENV NODE_ENV=production

# Expose the app port
EXPOSE 5000

# Start the server (update to use index.js)
CMD ["node", "./index.js"]