FROM node:0.10

RUN apt-get update

RUN apt-get install -y ruby-full

RUN apt-get install -y default-jre

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/tfox && cp -a /tmp/node_modules /opt/tfox/

RUN gem install scss-lint

ADD . /opt/tfox
WORKDIR /opt/tfox

EXPOSE 8080

# TODO this should not run the development server, but wait for a build trigger
CMD ["node", "server.js"]