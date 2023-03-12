import { FileStorage } from "./Databases/FileStorage";
import { Employee } from "./interfaces/Employee";
import { EmployeeService } from "./service/EmployeeService";
import { MulterService } from "./service/MulterService";
import { S3Service } from "./service/S3Service";
import dotenv from "dotenv";

dotenv.config();

const db = new FileStorage<Employee>("./DataStorage/data");

const S3Controller = new S3Service(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    signatureVersion: process.env.SIGNATURE_VERSION || "v4",
    region: process.env.REGION || "",
  },
  process.env.BUCKET_NAME || ""
);
const EmployeeController = new EmployeeService(db, S3Controller);
const MulterController = new MulterService();

export const context = { EmployeeController, MulterController, S3Controller };
