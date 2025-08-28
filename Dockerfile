# Use lightweight nginx image
FROM nginx:alpine

# Create directory for web app
RUN mkdir -p /usr/share/nginx/html

# Copy validation file and static build
COPY ./build /usr/share/nginx/html
COPY ./validation-key.txt /usr/share/nginx/html/validation-key.txt

# Copy custom nginx config if needed
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
