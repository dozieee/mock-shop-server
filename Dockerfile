# base image
FROM node:12-alpine
# create the working dir
RUN mkdir -p /src/mockshop
# set working dir
WORKDIR /src/mockshop
#copy the package.json file over
COPY ./package.json /src/mockshop
# install dependencies
RUN npm install
# copy the app over
COPY . /src/mockshop
# expose a por
EXPOSE 3000
# set default cmd
CMD ["npm","start"]

