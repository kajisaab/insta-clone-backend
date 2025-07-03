FROM node:22

WORKDIR /usr/src/app

COPY ../tsconfig.json ./tsconfig.json

COPY . ./

COPY package.json ./

RUN npm install 

WORKDIR /usr/src/app/post-service

RUN chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]