const aws = require("aws-sdk");
aws.config.update({
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  region: "YOUR_S3_REGION",
});

const s3 = new aws.S3();

const uploadToS3 = async (buffer, originalname,fileType) => {
    const params = {
      Bucket: "YOUR_S3_BUCKET_NAME",
      Key: `${Date.now()}-${originalname}`,
      Body: buffer,
      ContentType: fileType,
    };
  
    const uploadedImage = await s3.upload(params).promise();
    return uploadedImage.Location;
  };

  module.exports = { uploadToS3}