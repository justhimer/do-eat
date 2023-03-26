# the container will be based on the official Node.js Docker image with the Long-Term Support (LTS) version.
FROM node:lts

# create image in this working directory
WORKDIR /usr/src/app

# copy current folder into workdir
COPY . .

# port number
EXPOSE 3000

# run command
CMD yarn install && \
    yarn prisma migrate reset -f &&\
    yarn start:dev