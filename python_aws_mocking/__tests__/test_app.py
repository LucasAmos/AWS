import botocore.session
from botocore.stub import ANY, Stubber, validate_parameters

from src.app import is_bucket_versioning_enabled


s3_client = botocore.session.get_session().create_client("s3")
stubber = Stubber(s3_client)

get_bucket_versioning_enabled = {
    "ResponseMetadata": {
        "RequestId": "5NBVFJAFBY98N3G7",
        "HostId": "hdWaC6zq+64ZL4CFR1L4docIYSJK8og8dm0RsgPbqjulPVrmTT3jJSS/SEMA8OdIFqVVIfCdoi4=",
        "HTTPStatusCode": 200,
        "HTTPHeaders": {
            "x-amz-id-2": "hdWaC6zq+64ZL4CFR1L4docIYSJK8og8dm0RsgPbqjulPVrmTT3jJSS/SEMA8OdIFqVVIfCdoi4=",
            "x-amz-request-id": "5NBVFJAFBY98N3G7",
            "date": "Thu, 22 Sep 2022 11:52:24 GMT",
            "transfer-encoding": "chunked",
            "server": "AmazonS3",
        },
        "RetryAttempts": 1,
    },
    "Status": "Enabled",
}

get_bucket_versioning_disabled = {
    "ResponseMetadata": {
        "RequestId": "5NBVFJAFBY98N3G7",
        "HostId": "hdWaC6zq+64ZL4CFR1L4docIYSJK8og8dm0RsgPbqjulPVrmTT3jJSS/SEMA8OdIFqVVIfCdoi4=",
        "HTTPStatusCode": 200,
        "HTTPHeaders": {
            "x-amz-id-2": "hdWaC6zq+64ZL4CFR1L4docIYSJK8og8dm0RsgPbqjulPVrmTT3jJSS/SEMA8OdIFqVVIfCdoi4=",
            "x-amz-request-id": "5NBVFJAFBY98N3G7",
            "date": "Thu, 22 Sep 2022 11:52:24 GMT",
            "transfer-encoding": "chunked",
            "server": "AmazonS3",
        },
        "RetryAttempts": 1,
    }
}

get_bucket_versioning_suspended = {
    "ResponseMetadata": {
        "RequestId": "5NBVFJAFBY98N3G7",
        "HostId": "hdWaC6zq+64ZL4CFR1L4docIYSJK8og8dm0RsgPbqjulPVrmTT3jJSS/SEMA8OdIFqVVIfCdoi4=",
        "HTTPStatusCode": 200,
        "HTTPHeaders": {
            "x-amz-id-2": "hdWaC6zq+64ZL4CFR1L4docIYSJK8og8dm0RsgPbqjulPVrmTT3jJSS/SEMA8OdIFqVVIfCdoi4=",
            "x-amz-request-id": "5NBVFJAFBY98N3G7",
            "date": "Thu, 22 Sep 2022 11:52:24 GMT",
            "transfer-encoding": "chunked",
            "server": "AmazonS3",
        },
        "RetryAttempts": 1,
    },
    "Status": "Suspended",
}

stubber.add_response(
    "get_bucket_versioning", get_bucket_versioning_enabled, {"Bucket": ANY}
)
stubber.add_response(
    "get_bucket_versioning", get_bucket_versioning_disabled, {"Bucket": ANY}
)

stubber.add_response(
    "get_bucket_versioning", get_bucket_versioning_suspended, {"Bucket": ANY}
)


stubber.activate()


def test_is_bucket_versioning_enabled_true():
    with stubber:
        res = is_bucket_versioning_enabled(bucket_name="test-bucket", client=s3_client)
    assert res == True


def test_is_bucket_versioning_enabled_false():
    with stubber:
        res = is_bucket_versioning_enabled(bucket_name="test-bucket", client=s3_client)

    assert res == False


def test_is_bucket_versioning_enabled_suspended():
    with stubber:
        res = is_bucket_versioning_enabled(bucket_name="test-bucket", client=s3_client)

    assert res == False
