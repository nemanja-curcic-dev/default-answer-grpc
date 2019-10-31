FROM node:10-alpine

RUN mkdir /app
WORKDIR /app
COPY ./app/package*.json /app/


RUN npm install
COPY /app .
RUN chmod 775 /app/start.sh

ENTRYPOINT ["/app/start.sh"]