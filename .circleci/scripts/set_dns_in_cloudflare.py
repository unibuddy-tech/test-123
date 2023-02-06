import boto3
import click
import subprocess
from util import get_cloudformation_output


def get_subdomain_domain_name(service_name: str, target: str) -> str:
    """
    Create Subdomain Name
    :param service_name: Service name
    :param target: Deployment target
    :return: subdomain name
    """
    if target == "master":
        return service_name
    else:
        return f"{service_name}-{target}"


def get_private_domain_name(stack_name: str, region: str) -> str:
    """
    Retrieve private internal gateway domain name
    :param stack_name: Stack Name
    :param region: aws region
    :return: private domain
    """
    return get_cloudformation_output(
        stack_name, output_name="PrivateAlbDns", aws_region=region
    )


@click.command()
@click.option("--service_name")
@click.option("--domain")
@click.option("--target")
@click.option("--region")
def set_dns_in_cloudflare(
    service_name: str, domain: str, target: str, region: str
) -> None:
    """
    Set cloudfront domain name to cloudflare

    :param service_name: Service Name
    :param domain: domain name
    :param target: target enironment
    :param region: aws region for ub-net
    :return:
    """
    subdomain = get_subdomain_domain_name(service_name=service_name, target=target)

    private_domain = get_private_domain_name(stack_name=f"ub-net-{target}", region=region)

    subprocess.run(
        [
            "/app/build-base/deploy-cloudflare.sh",
            domain,
            subdomain,
            private_domain,
            "false",
        ]
    )


if __name__ == "__main__":
    set_dns_in_cloudflare()