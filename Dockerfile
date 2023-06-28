# ------------------------------

# FROM node:16.20.0-alpine

# RUN mkdir -p .usr/src/app
# WORKDIR /usr/src/appy

# COPY package.json usr/src/app
# COPY yarn.lock usr/src/app
# RUN yarn

# COPY . /usr/src/app
# RUN apk add tzdata
# ENV TZ="Asia/Bangkok"

# ENV HOST=0.0.0.0
# ENV PORT=3002


# EXPOSE 3002

# CMD ["node", ".output/server/index.mjs"]
# ENTRYPOINT ["node", ".output/server/index.mjs"]

# --------------so big and not working (ms)---------------------

# FROM node:16.20.0-alpine

# RUN mkdir -p .usr/src/app
# WORKDIR /usr/src/app

# COPY . /usr/src/app
# COPY yarn.lock /usr/src/app

# RUN yarn
# RUN yarn build

# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3002

# EXPOSE 3002 

# ENTRYPOINT ["node", ".output/server/index.mjs"]

#---------Not Working MODULE_NOT_FOULD cjs/loader---------------------------

# FROM node:16.20.0-alpine

# ADD .output /webapp/.output
# ADD node_modules /webapp/node_modules

# EXPOSE 3002

# WORKDIR /webapp/.output

# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3002

# ENTRYPOINT ["node", ".output/server/index.mjs"]

#---------------------------------

#-- see https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG NODE_VERSION=node:16.20.0

FROM $NODE_VERSION AS dependency-base

# create destination directory
RUN mkdir -p /app
WORKDIR /app

# copy the app, note .dockerignore
COPY package.json .
COPY yarn.lock .
RUN yarn

FROM dependency-base AS production-base

# build will also take care of building
# if necessary
COPY . .
RUN yarn build

FROM $NODE_VERSION-slim AS production

COPY --from=production-base /app/.output /app/.output

# Service hostname
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3002

# Service version
ARG NUXT_APP_VERSION
ENV NUXT_APP_VERSION=${NUXT_APP_VERSION}

# Run in production mode
ENV NODE_ENV=production

EXPOSE 3002

# start the app
CMD [ "node", "/app/.output/server/index.mjs" ]