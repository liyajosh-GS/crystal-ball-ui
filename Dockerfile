# Use an official Node runtime as a parent image
FROM node:14-alpine 

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Define the command to start the app
CMD [ "npm", "start" ]

# Please add your customised production build commands here
