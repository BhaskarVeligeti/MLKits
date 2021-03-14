# docker-compose up --build

# Use the official image as a parent image.
FROM node:latest

# Set working directory for API
RUN mkdir /client
WORKDIR /client

# Bundle app source
COPY dist/ .

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 3001

# command to run when intantiate an image
CMD ["node","client.js"]
