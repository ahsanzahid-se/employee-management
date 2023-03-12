import { EmployeeService } from "../service/EmployeeService";
import { S3Service } from "../service/S3Service";
import { Address, AddressInput } from "./Address";

export interface Employee {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: Address;
  birthdate: string;
  profilePicture?: string | null;
  supervisor?: Employee | null; 
  supervisorId? : string | null;
}

// export interface EmployeeInput {
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   address: AddressInput;
//   birthdate: string;
//   profilePicture?: string;
//   supervisor?: Employee;
// }

export interface EmployeeResolverContext {
  EmployeeController: EmployeeService;
  S3Controller : S3Service;
}