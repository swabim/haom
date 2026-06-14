ARG BUILD_FROM
FROM $BUILD_FROM

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package.json .
RUN npm install --production

COPY run.sh /
RUN chmod a+x /run.sh

COPY . .

EXPOSE 8099

CMD [ "/run.sh" ]
