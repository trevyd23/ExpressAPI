FROM node:12.16.3

WORKDIR /mernShoppingList

ENV PORT 80

COPY package.json /mernShoppingList/package.json

RUN npm install

COPY . /mernShoppingList

CMD [ "node", "server.js" ]
