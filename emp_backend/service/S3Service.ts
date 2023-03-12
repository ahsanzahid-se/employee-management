import dotenv from "dotenv";
import aws from "aws-sdk";

dotenv.config();

interface IS3Config {
  accessKeyId: string;
  secretAccessKey: string;
  signatureVersion: string;
  region: string
}

export class S3Service {
  private readonly s3;
  private readonly config;
  private readonly bucketName;

  constructor(config: IS3Config, bucketName: string) {
    this.s3 = new aws.S3(config);
    this.config = config;
    this.bucketName = bucketName
  }

  async getUploadURL(id: string) {
    const params = {
      Bucket: this.bucketName,
      Key: id,
      Expires: 100000,
      // ACL:  'public-read',
      // region: "region=us-east-2",
      // ContentType:"image/png",
      // ACL: 'public-read'
    };

    const uploadURL = this.s3.getSignedUrlPromise("putObject", params);

    return uploadURL;
  }
  // async uploadImage(key, ){
  //   this.s3.upload()
  // }
  async getImageURL(id: string) {
    const params = {
      Bucket: this.bucketName,
      Key: id,
      Expires: 10000,
      // ResponseContentType: 'image/png',
      // ACL: 'public-read'
    };
    try{
      const uploadURL = this.s3.getSignedUrlPromise("getObject", params);
  
      return uploadURL;
    }
    catch (e){
      console.log('e', e)
    }
  }
}
