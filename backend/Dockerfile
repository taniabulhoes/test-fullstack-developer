FROM node:18

WORKDIR /backend

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 4001

CMD [ "npm","run", "dev"]