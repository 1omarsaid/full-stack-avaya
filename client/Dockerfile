FROM node:8.7.0-alpine

# Create app directory and make it working directory
RUN mkdir -p /srv/app/fullstack-app-client
WORKDIR /srv/app/fullstack-app-client

COPY package.json /srv/app/fullstack-app-client

RUN npm install

COPY . /srv/app/fullstack-app-client

CMD ["npm", "start"]