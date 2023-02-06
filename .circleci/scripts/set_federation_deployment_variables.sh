#!/usr/bin/env bash

##
# This script assumes UB_ENVRIONMENT and UB_SERVICE are set
##

case $UB_ENVRIONMENT in
    qa)
        export API_URL="https://${UB_SERVICE}-qa.unibuddy.co"
        export VARIANT="qa" # or "qa-1", etc
    ;;
    dev)
        export API_URL="https://${UB_SERVICE}-staging.unibuddy.co"
        export VARIANT="staging"
    ;;
    internal)
        export API_URL="https://${UB_SERVICE}-internal.unibuddy.co"
        export VARIANT="internal"
    ;;
    master)
        export API_URL="https://${UB_SERVICE}.unibuddy.co"
        export VARIANT="production"
    ;;
    *)
        # Either handle default case or terminate
        >&2 echo "Unknown environment ${UB_ENVIRONMENT}"
        exit 1
    ;;
esac

export SCHEMA_LOCATION="./src/federated-schema.gql"
