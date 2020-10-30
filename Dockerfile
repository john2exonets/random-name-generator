FROM node:alpine

RUN mkdir /api
WORKDIR /api

ADD package.json /api/ 
RUN npm install 

COPY randomName.js /api 
 
ADD Dockerfile . 
ADD build_container.sh .

EXPOSE 80

CMD [ "npm", "start" ]

