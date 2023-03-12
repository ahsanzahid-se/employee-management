import { gql } from "apollo-server-express";

export default gql`
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
  }

  type Query {
    # employees: [Employee!]!
    employees: [Employee]!
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
    firstName: String!
    middleName: String
    lastName: String!
    email: String!
    phoneNumber: String!
    address: AddressInput!
    birthdate: String!
    profilePicture: String
    supervisor: String
  }

  type Mutation {
    addEmployee(employee: EmployeeInput!): Employee
    updateEmployee(id: String!, employee: EmployeeInput!): Employee
    deleteEmployee(id: String!): String
  }
`;