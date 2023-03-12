import { v4 as uuidv4 } from 'uuid';
import { Employee, EmployeeInput } from "./interfaces/employee";

const employees: Employee[] = [];

export default {
  Query: {
    employees: () => employees,
    employee: (_, { id }: { id: string }) => employees.find((e) => e.id === id),
  },
  Mutation: {
    addEmployee: (_, { employee }: { employee: EmployeeInput }) => {
      const id = uuidv4();
      const newEmployee = { id, ...employee };
      employees.push(newEmployee);
      return newEmployee;
    },
    updateEmployee: (
      _,
      { id, employee }: { id: string; employee: EmployeeInput }
    ) => {
      const index = employees.findIndex((e) => e.id === id);
      if (index === -1) return null;
      const updatedEmployee = { id, ...employee };
      employees[index] = updatedEmployee;
      return updatedEmployee;
    },
    deleteEmployee: (_, { id }: { id: string }) => {
      const index = employees.findIndex((e) => e.id === id);
      if (index === -1) return null;
      employees.splice(index, 1);
      return id;
    },
  },
};


