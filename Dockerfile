##
## BUILDER CONTAINER
##
FROM node:16-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY src ./src
COPY public ./public
COPY tsconfig.json ./

# Build the app
RUN yarn build

# Remove source maps for production
RUN rm -rf ./build/static/js/*.map

##
## RUNNER CONTAINER
##
FROM nginx:stable-alpine

# Copy custom nginx config
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY ./docker/entrypoint.sh /var/entrypoint.sh
RUN chmod +x /var/entrypoint.sh

# Copy build from builder
COPY --from=builder /app/build /var/www/webapp

# Override default nginx worker settings in config (optional)
RUN sed -i "s/worker_processes/#worker_processes/" /etc/nginx/nginx.conf && \
    echo "worker_processes auto;" >> /etc/nginx/nginx.conf && \
    echo "worker_rlimit_nofile 16384;" >> /etc/nginx/nginx.conf

# Set default command
CMD ["/var/entrypoint.sh"]
