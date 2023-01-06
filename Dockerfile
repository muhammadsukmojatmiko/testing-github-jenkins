# BASE IMAGE
FROM node:18-alpine

# ARGUMENTS
ARG github_token
ARG build_command

# SETUP SSH
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh && \
    apk add --no-cache bash git openssh-client && \
    ssh-keyscan github.com > ~/.ssh/known_hosts

# ADD SSH PRIVATE & PUBLIC KEY
ADD id_rsa /root/.ssh/id_rsa
ADD id_rsa /root/.ssh/id_rsa.pub
RUN chmod 600 /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa.pub

# SET ENV
ENV GITHUB_TOKEN=$github_token

# COPY APP CODE
WORKDIR /app
COPY . .

# INSTALL APP
RUN yarn install
RUN yarn $build_command

# REMOVE CONFIDENTIAL DATA
RUN rm -rf /root/.ssh/id_rsa && rm -rf /root/.ssh/id_rsa.pub && rm -rf id_rsa && rm -rf id_rsa.pub
ENV GITHUB_TOKEN=null

# RUN APP
CMD ["yarn", "start"]
EXPOSE 3000
