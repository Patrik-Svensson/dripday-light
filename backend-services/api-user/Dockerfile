# Use the official Node.js image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY .npmrc ./

# Install Node.js dependencies
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of the application code to the working directory
COPY . .

# Copy the service account JSON file into the container
COPY serviceaccount.json /app/serviceaccount.json

# Set the environment variable for Google Cloud credentials
ENV GOOGLE_APPLICATION_CREDENTIALS="/app/serviceaccount.json"

# Remove unnecessary files (e.g., source code if only using built code)
RUN rm -rf src

# Expose the port your application will run on
EXPOSE 3000

# Define the command to run your application
CMD ["node", "dist/app.js"]
