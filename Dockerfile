# pull the base image
FROM mhart/alpine-node:14.15.5

LABEL maintainer="GMMP" \
      name="site-4proj-api" \
      version="1.0"
      
# set the working direction
WORKDIR /

# add `/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
COPY webapi/package.json ./

COPY webapi/package-lock.json ./

RUN npm install

EXPOSE 2500

# add app
COPY webapi/. ./

# start app
CMD ["npm", "start"]
