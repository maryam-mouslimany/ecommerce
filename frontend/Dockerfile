# Stage 1: Build React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built React files from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config to handle React Router routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
