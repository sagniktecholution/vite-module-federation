# Node.js LTS base image for building and serving the Vite application
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifests and install all project dependencies
COPY package*.json ./
RUN npm install

# Copy TypeScript configs, Vite config, entry HTML, public assets and source files
COPY tsconfig*.json vite.config.ts index.html ./
COPY public ./public
COPY src ./src

# Build production assets (tsc -b && vite build)
RUN npm run build

# Expose the application port for local port mapping
EXPOSE 4147

# Serve the production build on all interfaces at port 5147
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4147"]

