#!/usr/bin/env python3
import os

import aws_cdk as cdk

from ub_ecr_cdk import ECRStackBuilder

# Grab environment variables
UB_SERVICE = os.getenv("UB_SERVICE")
AWS_REGION = os.getenv("AWS_DEFAULT_REGION")
AWS_ACCOUNT_ID = os.getenv("AWS_ACCOUNT_ID")


app = cdk.App()
env = cdk.Environment(account=AWS_ACCOUNT_ID, region=AWS_REGION)

# Stack to be created
ecr_stack = ECRStackBuilder(app, env=env).with_service_name(UB_SERVICE)

ecr_stack.build()

app.synth()
