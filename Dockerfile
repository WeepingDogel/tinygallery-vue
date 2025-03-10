# Use an official nginx runtime as a parent image
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy the build output from the dist folder to nginx's html directory
COPY dist/ .

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set environment variables
ENV API_BASE_URL=http://your-domain.com/api/v1

# Add metadata labels
LABEL maintainer="WeepingDogel <weepingdogel@gmail.com>"
LABEL version="1.0"
LABEL description="Docker image for TinyGallery-Frontend application"

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
