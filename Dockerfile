FROM node:latest
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
RUN npm install && npm install typescript -g
COPY . .
RUN tsc
EXPOSE 3000
CMD npm run start