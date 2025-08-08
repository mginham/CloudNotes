# === Stage 1: Build stage === #
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache for dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy all source files into the container
COPY . .

# Run the build script (e.g., to create production-ready files in /app/dist)
RUN npm run build


# === Stage 2: Production stage === #
FROM nginx:alpine

# Copy the built static files from the build stage into Nginx's default public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Replace the default Nginx config with a custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx in the foreground (required for Docker container to keep running)
CMD ["nginx", "-g", "daemon off;"]