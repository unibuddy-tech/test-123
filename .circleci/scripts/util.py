import boto3


def get_cloudformation_output(
    stack_name: str, output_name: str, aws_region: str
) -> str:
    """
    Retrieve a concrete cloudformation output

    :param stack_name: The name of the CloudFormation stack
    :param output_name: The export name to retrieve
    :param aws_region: The name of the AWS region to retrieve the output from

    :return: s3 uri
    """
    client = boto3.client("cloudformation", region_name=aws_region)
    response = client.describe_stacks(StackName=stack_name)
    for stack in response["Stacks"]:
        if stack["StackName"] == stack_name:
            for output in stack["Outputs"]:
                if output["OutputKey"] == output_name:
                    return output["OutputValue"]