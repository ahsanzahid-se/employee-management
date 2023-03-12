import {
  Employee,
  EmployeeResolverContext,
} from "../interfaces/Employee";

export default {
  Query: {
    getUploadURL: (
      {},
      { id }: { id: string },
      { S3Controller }: EmployeeResolverContext
    ) => S3Controller.getUploadURL(id),
    getImageURL: (
      {},
      { id }: { id: string },
      { S3Controller }: EmployeeResolverContext
    ) => S3Controller.getImageURL(id),
    employees: ({}, {}, { EmployeeController }: EmployeeResolverContext) =>
      EmployeeController.getAll(),
    employee: (
      _: unknown,
      { id }: { id: string },
      { EmployeeController }: EmployeeResolverContext
    ) => EmployeeController.get(id),
  },
  Mutation: {
    addEmployee: (
      {},
      { employee }: { employee: Employee },
      { EmployeeController }: EmployeeResolverContext
    ) => EmployeeController.add(employee),
    updateEmployee: (
      {},
      { id, employee }: { id: string; employee: Employee },
      { EmployeeController }: EmployeeResolverContext
    ) => EmployeeController.update(employee),

    deleteEmployee: (
      {},
      { id }: { id: string },
      { EmployeeController }: EmployeeResolverContext
    ) => EmployeeController.delete(id),

  },
};
