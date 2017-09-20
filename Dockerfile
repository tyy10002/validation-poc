FROM node:boron

# Create app directory
WORKDIR /development/docker/app

# Install app dependencies
COPY package.json .
#COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 6001
CMD [ "npm", "start" ]
