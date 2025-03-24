FROM node:20

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the application
COPY . .

# Expose client port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
