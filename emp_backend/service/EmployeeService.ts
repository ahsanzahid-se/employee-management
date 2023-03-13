import { Employee } from "../interfaces/Employee";
import { Database } from "../interfaces/FileDatabase";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import { S3Service } from "./S3Service";

export class EmployeeService {
  private readonly _repo: EmployeeRepository;
  private readonly _aws_s3: S3Service;

  constructor(db: Database<Employee>, aws_s3: S3Service) {
    this._repo = new EmployeeRepository(db);
    this._aws_s3 = aws_s3;
  }

  async getAll() {
    try {
      const emps = await this._repo.getAll();
      const employees = emps.map(async (emp: Employee) => {
        if (emp.profilePicture) {
          const profilePicture = await this._aws_s3.getImageURL(emp.id);

          return { ...emp, profilePicture };
        }
        return emp;
      });

      return employees;
    } catch (err) {
      return err;
    }
  }

  async get(id: string) {
    try {
      const employee = await this._repo.get(id);
      if (employee && employee.profilePicture) {
        const profilePicture = await this._aws_s3.getImageURL(employee.id);

        return { ...employee, profilePicture };
      }
      return employee;
    } catch (err) {
      throw err;
    }
  }

  async getEmployeeByEmail(email: string) {
    try {
      const employee = await this._repo.getByEmail(email);
      if (employee) {
        throw new Error("Employee with same email address already exists.");
      }
    } catch (err) {
      throw err;
    }
  }

  async add(employee: Employee) {
    try {
      await this.getEmployeeByEmail(employee.email);
      const supervisor =
        employee && employee.supervisorId
          ? await this.get(employee.supervisorId)
          : null;

      const emp = await this._repo.add({ ...employee, supervisor: supervisor });
      if (emp && emp.profilePicture) {
        const profilePicture = this._aws_s3.getImageURL(employee.id);

        return { ...emp, profilePicture };
      }
      return emp;
    } catch (err) {
      return err;
    }
  }
  async update(employee: Employee) {
    try {
      const supervisor =
        employee && employee.supervisorId
          ? await this.get(employee.supervisorId)
          : null;

      return this._repo.update({ ...employee, supervisor: supervisor });
    } catch (err) {
      return err;
    }
  }
  delete(id: string) {
    return this._repo.delete(id);
  }
}
