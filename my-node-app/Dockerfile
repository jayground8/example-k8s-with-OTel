FROM node:20.10-alpine3.19 As build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20.10-alpine3.19
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node package*.json ./
RUN npm ci --only=production && npm cache clean --force
USER node
CMD [ "node", "dist/main.js" ]