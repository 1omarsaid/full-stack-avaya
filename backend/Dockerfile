FROM node:8.7.0-alpine

# Create app directory and make it working directory
RUN mkdir -p /srv/app/fullstack-app-server
WORKDIR /srv/app/fullstack-app-server

COPY package.json /srv/app/fullstack-app-server
COPY package-lock.json /srv/app/fullstack-app-server

RUN npm install
COPY . /srv/app/fullstack-app-server

CMD ["npm", "start"]