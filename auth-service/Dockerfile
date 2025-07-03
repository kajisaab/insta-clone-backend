#User official Node.js LTS image. 
FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./ 
RUN npm install 

RUN npm install bcrypt --force

COPY . .

RUN npm run build

EXPOSE 3000

# CMD["node", "dist/index.js"]
CMD ["npm", "run", "start"]
