FROM node:12.11.0-alpine

LABEL maintainer="danielbellert@gmail.com"

# needed for flow
# Tini is now available at /sbin/tini
RUN apk update && apk add --no-cache tini
RUN apk --no-cache add ca-certificates wget
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk
RUN apk add glibc-2.28-r0.apk

# expose port
ARG PORT=9000
ENV PORT $PORT

EXPOSE $PORT

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# Global npm dependencies
# If you need to install global npm dependencies, it is recommended to place those dependencies in
# the non-root user directory
RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /home/node

# install local dependencies
COPY ./react-in-docker/app/package*.json ./
RUN npm install --loglevel=error && npm cache clean --force

ENV PATH /home/node/node_modules/.bin:$PATH

# copy application
WORKDIR /home/node/app
COPY ./react-in-docker/app .

RUN npm run build

# Add Tini
ENTRYPOINT ["/sbin/tini", "--"]
# Run your program under Tini
CMD ["node", "server/index.js"]

