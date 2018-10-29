FROM ubuntu:16.04

RUN apt-get update && apt-get install -y --no-install-recommends apt-utils

RUN apt-get install -y curl unzip

# install node
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs

# install express-generator
RUN npm install express-generator -g

# install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

WORKDIR /kingpin
COPY . .
RUN yarn install
