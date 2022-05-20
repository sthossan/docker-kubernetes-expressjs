FROM node:14-alpine as base

#######################################
####### for docker default #######
#######################################

WORKDIR /src/app
COPY package*.json ./
EXPOSE 3000

RUN npm ci
COPY . /src/app
CMD ["npm", "start"]



#######################################
####### for docker-compose code #######
#######################################

# # # # WORKDIR /src/app
# # # # COPY package*.json ./
# # # # EXPOSE 3000

# # # # FROM base as production
# # # # ENV NODE_ENV=production
# # # # RUN npm ci
# # # # COPY . /
# # # # CMD ["node", "bin/www"]

# # # # FROM base as dev
# # # # ENV NODE_ENV=development
# # # # RUN npm install -g nodemon && npm install
# # # # COPY . /
# # # # CMD ["nodemon", "bin/www"]