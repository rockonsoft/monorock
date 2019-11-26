# Use the official Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:10

# Create and change to the app directory.
WORKDIR /usr/src/app

ARG BUILD_COMMIT
ENV BUILD_ID=${BUILD_COMMIT}

ARG DB_PASSWORD
ENV DB_PWD=${DB_PASSWORD}

ARG FIREBASE_CONFIG
ENV FIREBASE_CONFIG=${FIREBASE_CONFIG}

ENV API_JWT_TOKEN=${BUILD_COMMIT}${DB_PASSWORD}

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . ./


# Run the web service on container startup.
CMD [ "npm", "start" ]