FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install --save ts-node-dev


COPY . .

EXPOSE 4000

CMD [ "npm ", "run", "start:server" ]