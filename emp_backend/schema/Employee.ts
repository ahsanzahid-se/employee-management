import { gql } from "apollo-server-express";
// import { Employee as iEmp } from "../interfaces/Employee";

export default gql`
  scalar Upload
  type FileUploadResponse {
    success: Boolean!
  }

  # type UploadFile {
  #   uploadImage(img: Upload!): FileUploadResponse!
  # }

  type Address {
    line1: String!
    line2: String
    city: String!
    zip: String!
    country: String!
  }

  type Employee {
    id: String!
    firstName: String!
    middleName: String
    lastName: String!
    email: String!
    phoneNumber: String!
    address: Address!
    birthdate: String!
    profilePicture: String
    supervisor: Employee
    supervisorId: String
  }

  type Query {
    employees: [Employee!]!
    getUploadURL(id:String!) : String
    getImageURL(id:String!) : String
    employee(id: String!): Employee
  }
  

  input AddressInput {
    line1: String!
    line2: String
    city: String!
    zip: String!
    country: String!
  }

  input EmployeeInput {
    id: String
    firstName: String!
    middleName: String
    lastName: String!
    email: String!
    phoneNumber: String!
    address: AddressInput!
    birthdate: String!
    profilePicture: String
    supervisor: EmployeeInput
    supervisorId: String
  }

  type Mutation {
    addEmployee(employee: EmployeeInput!): Employee
    updateEmployee(id: String!, employee: EmployeeInput!): Employee
    deleteEmployee(id: String!): String
  }
`;