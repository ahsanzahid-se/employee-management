import gql from "graphql-tag";

export const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation updateEmployee($id: String!, $employee: EmployeeInput!) {
    updateEmployee(id: $id, employee: $employee) {
      id
      firstName
      middleName
      lastName
      email
      phoneNumber
      address {
        line1
        line2
        city
        zip
        country
      }
      birthdate
      profilePicture
      supervisor {
        id
        firstName
        middleName
        lastName
        email
        phoneNumber
        address {
          line1
          line2
          city
          zip
          country
        }
        birthdate
        profilePicture
      }
    }
  }
`;

export const ADD_EMPLOYEE_MUTATION = gql`
  mutation addEmployee($employee: EmployeeInput!) {
    addEmployee(employee: $employee) {
      id
      firstName
      middleName
      lastName
      email
      phoneNumber
      address {
        line1
        line2
        city
        zip
        country
      }
      birthdate
      profilePicture
      supervisor {
        id
        firstName
        middleName
        lastName
      },
    }
  }
`;


export const DELETE_EMPLOYEE_MUTATION = gql`
  mutation deleteEmployee($id: String!) {
    deleteEmployee(id: $id)
  }
`;