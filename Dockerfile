FROM node:12 as builder 

ENV NODE_VERSION 11.10.1

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-selfsigned.crt /etc/nginx/conf.d/nginx-selfsigned.crt
COPY ./nginx-selfsigned.key /etc/nginx/conf.d/nginx-selfsigned.key
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]