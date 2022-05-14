FROM node:latest

# # set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src

# # add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# # install and cache app dependencies
ADD package.json /usr/src/package.json
COPY . .


RUN npm install

EXPOSE 3001

# start app
CMD ["npm", "start"]