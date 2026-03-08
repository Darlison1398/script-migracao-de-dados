FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "src/migrate.js"]


## rodar esses comandos
# docker build -t migration-script .
# docker run migration-script