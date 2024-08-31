FROM node:18

COPY . /var/www
WORKDIR /var/www

CMD npm install && npm run dev

EXPOSE 3000