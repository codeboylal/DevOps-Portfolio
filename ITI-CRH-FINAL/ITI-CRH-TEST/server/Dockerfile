FROM node:20

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









