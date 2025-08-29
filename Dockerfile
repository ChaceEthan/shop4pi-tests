# Step 1: Use Node base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files
COPY package.json yarn.lock ./

# Step 4: Install dependencies
RUN yarn install --frozen-lockfile

# Step 5: Copy the rest of the code
COPY . .

# Step 6: Expose port (change if not 3000)
EXPOSE 3000

# Step 7: Start the backend app
CMD ["yarn", "start"]
