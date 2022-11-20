#Application build
FROM node:14.19.1-alpine3.14 AS node_image
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

#NGINX build
FROM nginx:1.22.1-alpine

ENV HTML_DIR=/usr/share/nginx/html
ENV TEMPLATE_DIR=/usr/share/nginx/template

COPY --from=node_image /app/dist/food-service-ui $HTML_DIR
COPY entrypoint.sh /bin/entrypoint.sh
COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

RUN ls -l $HTML_DIR && \
  mkdir $TEMPLATE_DIR && \
  cp -r $HTML_DIR/* $TEMPLATE_DIR/

ENTRYPOINT [ "/bin/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 5002
