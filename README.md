# TypeScript Nest Project Template

This is some boilerplate to help setup a TypeScript Nest project.

## Pre requities

You will need a ci user, please submit a pr in the [IAM](https://github.com/Unibuddy/iam) repo with the permissions. Use `#ask-platform-anything` if you would like a hand setting this up.

## Folder structure

```
my-app/
├─ .circleci/                       # Where deployment / build scripts live
│  ├─ deploy
│     ├─ .gitignore
│     ├─ app.py                     # Where the api cdk deployment lives
│     ├─ cdk.json
│     ├─ requirements.txt
│  ├─ deploy_ecr
│     ├─ .gitignore
│     ├─ app.py                     # Where the ecr cdk deployment lives
│     ├─ cdk.json
│     ├─ requirements-dev.txt
│     ├─ requirements.txt
│  ├─ config.yml
│  ├─ scripts/
│     ├─ set_federation_deployment_variables.sh
├─ scripts/                         # Any scripts
│  ├─ generate-federated-schema.ts  # Generates Graph QL federated schema
├─ src/                             # Boilerplate nest code to get you started
│  ├─ example-graphql/              # Example Graph QL module
│    ├─ example-graphql.module.ts
│    ├─ example-graphql.repository.spec.ts
│    ├─ example-graphql.repository.ts
│    ├─ example-graphql.resolver.spec.ts
│    ├─ example-graphql.resolver.ts
│    ├─ example-graphql.service.spec.ts
│    ├─ example-graphql.service.ts
│  ├─ app.module.ts
│  ├─ main.ts
├─ test/                             # E2E tests
│  ├─ graphql.e2e.spec.ts
│  ├─ jest.e2e.config.js
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ Dockerfile
├─ jest.config.js
├─ nest-cli.json
├─ package.json
├─ README.md
├─ tsconfig.build.json
├─ tsconfig.json
├─ version.yml
```

# CDK

For a comprehensive list of configurable options please consult the documentation [ub-api-cdk](https://www.notion.so/unibuddy/ub-api-cdk-v1-1-183-b61b205fc08547008b60a7b13eddfaa1).
You will need to change things like the `LoadBalancerListenerConfiguration`'s subdomain.

# Circle Ci Environment Variables

The following need to be manually set in circleci, please use `#ask-platform-anything` for help.

- `UB_SERVICE` your service name, `ub-` prefixed and needs to match what is in ECR

# Cloudflare deployment

Cloudflare DNS deployment comes already enabled. This is configured with the `deploy-cloudflare` job in `.circleci/config.yml` Circle CI config `deploy` workflow. The job uses `.circleci/scripts/set_dns_in_cloudflare.py` as well.

## Removal

If you do not require Cloudflare DNS for your service simply delete the `deploy-cloudflare` job in `.circleci/config.yml` Circle CI config, and the relevant job in the `deploy` workflow.

# GraphQL

GraphQL with nest uses the following packages

```
@nestjs/graphql
@nestjs/apollo
graphql
apollo-server-express
@apollo/federation
@apollo/subgraph
```

and the following dev dependencies:

```
@graphql-tools/utils
graphql-request
```

The `src/example-graphql` module has an example of a GraphQL module up to the standard we want at Unibuddy. It also has examples of unit tests. Additionally an example of a graphql E2E test can be found in `test/`.

GraphQL federation deployment comes already enabled. This is configured with the `deploy-federation-schema` job in `.circleci/config.yml` Circle CI config `deploy` workflow. The job uses `.circleci/scripts/set_federation_deployment_variables.sh` as well _(Remember to update the federation deployment environment variables in the script)_.

## Removal

If you do not require GraphQL for your service, you can remove the packages above from your `package.json` file, delete the example module, and remove the modules from the provider list in `src/app.module.ts` including the `GraphQLModule`. You should also delete the `deploy-federation-schema` job in `.circleci/config.yml` Circle CI config, and the relevant job in the `deploy` workflow.

Remember to also remove the following files.

- `.circleci/scripts/set_federation_deployment_variables.sh`
- `scripts/generate-federated-schema.ts`
- `src/schema.gql`
- `src/federated-schema.gql`
- `test/graphql.e2e.spec.ts`

# E2E

E2E tests are located in `test/`. The E2E tests uses Nest testing libraries and the following dev dependencies.

```
supertest
```

# Logger
 Logger is initialised at bootstrap in : `src/logger.ts` . Logging level is set `info`. Set logging level to env variable `LOG_LEVEL` to change logging level. For local environment debug level is set to `debug`.
