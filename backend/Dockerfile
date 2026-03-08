# Use Node 18 image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files first for caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --prod

# Copy source code
COPY . .

# Expose server port
EXPOSE 3001

# Start the server
CMD ["pnpm", "start"]


