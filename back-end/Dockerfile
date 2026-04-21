# Use official Node image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose your API port
EXPOSE 4000

# Start server
CMD ["npm", "start"]