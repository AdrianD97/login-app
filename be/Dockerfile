FROM node as builder

# Create app directory
WORKDIR /usr/src/

# Install app dependencies
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

###################################
FROM node:slim

# Create app directory
WORKDIR /usr/src/

# Install app dependencies
COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/dist/ ./dist/

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
