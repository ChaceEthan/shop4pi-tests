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

# Step 6: Build the app
RUN yarn build

# Step 7: Start the app
CMD ["yarn", "start"]
