# Use official Node.js 18 image as the base image
FROM node:18 

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to the working directory
# This is done separately to leverage Docker layer caching for faster rebuilds
COPY package*.json ./

# Install dependencies listed in package.json
RUN npm install

# Copy the rest of the application source code into the container
COPY . .

# Expose port 3001 so the container can communicate on this port
EXPOSE 3001

# Define the command to run the app when the container starts
CMD ["node", "index.js"]