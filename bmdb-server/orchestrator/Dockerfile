FROM node:18.13

WORKDIR /usr/local/orchestrator

ENV PORT=4000

COPY package.json package-lock.json /usr/local/orchestrator/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

RUN redis-cli ping

COPY ./ ./

CMD ["npm", "run", "dev"]