import dotenv from "dotenv";
import aws from "aws-sdk";
import { IS3Config } from "../interfaces/S3";
import { StorageBucket } from "../interfaces/StorageBucket";

dotenv.config();

export class S3Service implements StorageBucket<string> {
  private readonly s3;
  private readonly config;
  private readonly bucketName;

  constructor(config: IS3Config, bucketName: string) {
    this.s3 = new aws.S3(config);
    this.config = config;
    this.bucketName = bucketName;
  }

  async getUploadURL(id: string) {
    const params = {
      Bucket: this.bucketName,
      Key: id,
      Expires: 100000,
    };
    try{
      const uploadURL = this.s3.getSignedUrlPromise("putObject", params);
  
      return uploadURL;

    }
    catch(err){
      throw new Error("Error while getting image url")
    }
  }

  async getImageURL(id: string) {
    const params = {
      Bucket: this.bucketName,
      Key: id,
      Expires: 10000,
    };
    try {
      const uploadURL = this.s3.getSignedUrlPromise("getObject", params);

      return uploadURL;
    } catch (e) {
      throw new Error("error while uploading image");
    }
  }
}
