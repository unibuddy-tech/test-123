#!/usr/bin/env python3
import os

import aws_cdk as cdk

from ub_datadog_monitors_cdk.monitors.configuration.ApiFramework import ApiFramework

from ub_api_cdk import ApiStackBuilder, ApplicationVisibility
from ub_api_cdk.configuration import (
    ContainerConfiguration,
    LoadBalancerTargetGroupConfiguration,
    LoadBalancerListenerConfiguration,
)

environment_config = {
    "UB_ENVIRONMENT": os.getenv("UB_ENVIRONMENT", None),
    "UB_SERVICE": os.getenv("UB_SERVICE", None),
    "AWS_ACCOUNT_ID": os.getenv("AWS_ACCOUNT_ID", None),
    "AWS_REGION": os.getenv("AWS_DEFAULT_REGION", None),
    "VERSION": os.getenv("VERSION", None)
}

has_environment_error = False

for key in environment_config:
    if environment_config[key] == None:
        print(f"""Environment variable: "{key}" must be set""")
        has_environment_error = True

if has_environment_error:
    exit(1)

env = cdk.Environment(
    account=environment_config["AWS_ACCOUNT_ID"],
    region=environment_config["AWS_REGION"],
)


app = cdk.App()
PORT = -1 # ADD PORT NUMBER

print(
    f"""
Deploying service

UB_SERVICE     => {environment_config["UB_SERVICE"]}
UB_ENVIRONMENT => {environment_config["UB_ENVIRONMENT"]}
VERSION        => {environment_config["VERSION"]}
AWS_ACCOUNT_ID => {environment_config["AWS_ACCOUNT_ID"]}
AWS_REGION     => {environment_config["AWS_REGION"]}
PORT           => {PORT}
"""
)

###
# For a full list of configuration please see here:
# https://www.notion.so/unibuddy/ub-api-cdk-v1-1-183-b61b205fc08547008b60a7b13eddfaa1
#
# The underlying defaults are most likely suitable only for qa and NOT production
#
api_stack = (
    ApiStackBuilder(app, env=env)
    .with_service_name(environment_config["UB_SERVICE"])
    .with_ub_environment(environment_config["UB_ENVIRONMENT"])
    .with_version(environment_config["VERSION"])
    .with_application_visibility(ApplicationVisibility.PRIVATE)
    .with_container_configuration(
        ContainerConfiguration(
            port=PORT,
            environment={
                "DD_ENV": environment_config["UB_ENVIRONMENT"],
                "DD_VERSION": environment_config["VERSION"],
                "DD_SERVICE": environment_config["UB_SERVICE"],
                "DD_TRACE_AGENT_URL": "http://ub-dd-traceagent-qa.unibuddy.co",
                "DD_SITE": "datadoghq.eu"
            },
        )
    )
    .with_loadbalancer_target_group_configuration(
        LoadBalancerTargetGroupConfiguration(port=PORT)
    )
    .with_loadbalancer_listener_configuration(
        LoadBalancerListenerConfiguration(
            # For non production: f"{environment_config['UB_SERVICE']}-{environment_config['UB_ENVIRONMENT']}"
            subdomain=f"CHANGE ME",
        )
    )
    .with_default_monitor_pile(
        api_framework=ApiFramework.EXPRESS
    )
    .build()
)

app.synth()
