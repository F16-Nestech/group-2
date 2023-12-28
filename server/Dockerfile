FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --force --legacy-peer-deps
COPY . ./
# RUN npm run build

EXPOSE 5002

CMD [ "npm", "start" ]
