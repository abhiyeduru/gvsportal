# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy source code and build
COPY . .
RUN pnpm build   # generates /dist

# Production stage
FROM nginx:alpine

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: custom nginx config for /api proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
