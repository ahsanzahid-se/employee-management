import gql from "graphql-tag";

export const EMPLOYEES_QUERY = gql`
  query Employees {
    employees {
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
      supervisorId
      supervisor {
        id
        firstName
      }
    }
  }
`;
export const GET_UPLOAD_URL = gql`
  query GetUploadURL($id: String!) {
    getUploadURL(id: $id)
  }
`;

export const EMPLOYEE_QUERY = gql`
  query Employee($id: String!) {
    employee(id: $id) {
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
      supervisorId
      supervisor {
        id
        firstName
        lastName
      }
    }
  }
`;
