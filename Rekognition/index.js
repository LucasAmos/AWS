const fs = require("fs");
const AWS = require("aws-sdk");
const { v1: uuid } = require("uuid");
require("dotenv").config();

const { ACCESSKEYID, SECRETACCESSKEY, REGION, BUCKET } = process.env;
AWS.config.update({
  accessKeyId: ACCESSKEYID,
  secretAccessKey: SECRETACCESSKEY,
  region: REGION,
});
const s3 = new AWS.S3();
const rekognition = new AWS.Rekognition();

async function uploadFile(filePath, bucket) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const params = {
      Bucket: bucket,
      Key: uuid(),
      Body: fileContent,
    };
    const result = s3.upload(params).promise();
    return result;
  } catch (error) {
    throw Error(error.message);
  }
}

async function getImageLabels(bucket, filename) {
  const params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: filename,
      },
    },
    MaxLabels: 10,
  };

  try {
    const result = await rekognition.detectLabels(params).promise();
    return result;
  } catch (error) {
    throw Error(error.message);
  }
}

async function deleteFile(bucket, key) {
  const params = {
    Bucket: bucket,
    Key: key,
  };

  try {
    const result = await s3.deleteObject(params).promise();
    return result;
  } catch (error) {
    throw Error(error.message);
  }
}

async function analyseImage(filePath) {
  try {
    const res = await uploadFile(filePath, BUCKET);
    const result = await getImageLabels(BUCKET, res.key);
    deleteFile(BUCKET, res.Key);

    result.Labels.forEach((label) => {
      console.log(`${label.Confidence}% confidence that is a ${label.Name}`);
    });
  } catch (error) {
    console.log(error);
  }
}

analyseImage("./sossusvlei.JPG");
