FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the default port
EXPOSE 3000

# Start the application using your dev script
CMD ["npm", "run", "dev"]FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application using the dev script (tsx server.ts)
CMD ["npm", "run", "dev"]