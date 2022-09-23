import boto3

s3_client = boto3.client("s3")


def is_bucket_versioning_enabled(bucket_name, client=s3_client):
    bucket = client.get_bucket_versioning(Bucket=bucket_name)
    return True if bucket.get("Status") == "Enabled" else False


def print_buckets():
    print(is_bucket_versioning_enabled(bucket_name="lucasamostest2"))


if __name__ == "__main__":
    print_buckets()
