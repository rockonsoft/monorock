FROM node:10

WORKDIR /app

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# add app
COPY ./dist/ ./

# copy eng
# MKDIR /home/hano/src/rockonsoft/rockonsoft/apps/team-api/src/environments/environment.ts
RUN mkdir environments
COPY ./apps/team-api/src/environments/* ./environments/

# start app
CMD node apps/team-api/main.js