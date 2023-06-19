FROM node:18.8.0-alpine

RUN mkdir -p .usr/src/app
WORKDIR /usr/src/app

COPY package.json usr/src/app
RUN yarn

COPY . /usr/src/app
RUN apk add tzdata
ENV TZ="Asia/Bangkok"

ENV HOST=0.0.0.0
ENV PORT=3002


EXPOSE 3002

ENTRYPOINT ["node", ".output/server/index.mjs"]

CMD ["npm", "run", "preview"]


# ### only out put
# ADD .output /webapp/.output

# EXPOSE 3002

# WORKDIR /webapp/.output

# ENV HOST=0.0.0.0
# ENV PORT=3002

# CMD ["node", "/webapp/.output/server/index.mjs"]

# #docker run -p 127.0.0.1:3002:3002/tcp <image_name>