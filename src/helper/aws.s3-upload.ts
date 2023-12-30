import * as AWS from 'aws-sdk';
import { UploadToS3Params } from '../types/types';

AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_S3_REGION',
});

const s3 = new AWS.S3();

const uploadToS3 = async ({ buffer, originalname, fileType }: UploadToS3Params): Promise<string> => {
  const params: AWS.S3.Types.PutObjectRequest = {
    Bucket: 'YOUR_S3_BUCKET_NAME',
    Key: `${Date.now()}-${originalname}`,
    Body: buffer,
    ContentType: fileType,
  };

  const uploadedImage: AWS.S3.ManagedUpload.SendData = await s3.upload(params).promise();
  return uploadedImage.Location;
};

export { uploadToS3 };
