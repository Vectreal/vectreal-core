# Build stage
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copy only package.json and package-lock.json (or yarn.lock) first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npx nx build vctrl/official-website

# Production stage
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=build-stage /app/dist/apps/official-website /usr/share/nginx/html

# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the nginx configuration file
COPY ./apps/official-website/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]