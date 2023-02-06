# We build using our Unibuddy image as that comes with python and the correct
# version of yarn.
#
# For the container to push to ECR we only want production dependencies, node,
# and the application code

# Dependency install phase
FROM unibuddytech/node-build-base as dependency_image

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_SESSION_TOKEN
ARG AWS_CA_REPO
ARG AWS_CA_DOMAIN_OWNER
ARG AWS_CA_DOMAIN_NAME
ARG AWS_DEFAULT_REGION
ARG VERSION

WORKDIR /dependencies

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.build.json ./tsconfig.build.json
COPY ./src ./src

# We can't install node modules as the circlci user
USER root

RUN aws codeartifact login \
	--tool npm \
	--repository $AWS_CA_REPO \
	--domain $AWS_CA_DOMAIN_NAME \
	--domain-owner $AWS_CA_DOMAIN_OWNER \
	--region $AWS_DEFAULT_REGION

RUN yarn --frozen-lockfile --non-interactive

RUN yarn build
# At this point in time we now have node modules with Dev dependencies, i.e
# a typescript compiler, type definitions and a testing framework which we do not need.
RUN yarn clean

# Install only what is needed for production
RUN yarn --frozen-lockfile --non-interactive --production

# This is the image we will push to ECR
FROM node:14.5.0-alpine

WORKDIR ./service

COPY --from=dependency_image /dependencies/node_modules ./node_modules
COPY --from=dependency_image /dependencies/dist ./dist

RUN echo "The rest of your applications setup lives here"
RUN exit 1

# For example:
# EXPOSE <port>
# CMD ["node", <app_entry>]
