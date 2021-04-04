FROM node:12.16.3

WORKDIR /client

ENV PORT 80

COPY package.json /client/package.json

RUN npm install

COPY . /client

CMD [ "npm", "start" ]