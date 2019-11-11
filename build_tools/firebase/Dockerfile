# use latest Node LTS (Boron)
FROM node:dubnium
# install Firebase CLI
RUN npm install -g firebase-tools

ARG FIRESTORE_TOKEN
ENV ENV_FIRESTORE_TOKEN=${FIRESTORE_TOKEN}

ENTRYPOINT ["/usr/local/bin/firebase","--token=`$ENV_FIRESTORE_TOKEN`"]