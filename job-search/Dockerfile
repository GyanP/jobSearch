FROM node:14.17.0-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN \
    rm -rf package-lock.json; \
    rm -rf yarn.lock; \
    yarn install
COPY . .
EXPOSE 3000
# define env variables
ARG REACT_APP_SERVER_URL=http://localhost:8080/
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
RUN echo $REACT_APP_SERVER_URL
RUN echo "REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL" > .env
CMD ["yarn", "start"]
