import { Database } from "../interfaces/FileDatabase";
import * as fs from "fs";

export class FileStorage<T extends { id: string, email: string }> implements Database<T> {
  private employees: T[] = [];
  private readonly filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.load();
  }

  add(employee: T): Promise<T> {
    try {
      this.employees.push(employee);
      this.save();

      return new Promise((resolve) => {
        resolve(employee);
      });
    } catch (err) {
      throw new Error("Internal Server error: Employee add failed!");
    }
  }

  get(id: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      const employee = this.employees.find((employee) => employee.id === id);
      if (employee) {
        resolve(employee);
        return;
      }
      resolve(null);
    });
  }
  
  getByEmail(email: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      const employee = this.employees.find((employee) => employee.email === email);
      if (employee) {
        resolve(employee);
        return;
      }
      resolve(null);
    });
  }

  getAll(): Promise<T[]> {
    return new Promise((resolve) => resolve(this.employees));
  }
  async update(emp: T): Promise<T | Error> {
    try {
      const index = this.employees.findIndex(
        (employee) => employee.id === emp.id
      );

      if (index === -1) {
        throw new Error("No employee found with this id");
      }
      const employee = { ...this.employees[index], ...emp };
      this.employees[index] = employee;
      this.save();

      return new Promise((resolve) => resolve(employee));
    } catch (err) {
      throw err;
    }
  }

  delete(id: string): Promise<string> {
    try {
      this.employees = this.employees.filter((employee) => employee.id !== id);
      this.save();

      return new Promise((resolve) => {
        resolve(id);
      });
    } catch (err) {
      throw new Error("Internal server error: Employee could not be delete");
    }
  }
  private load() {
    try {
      const data = fs.readFileSync(this.filename, "utf-8");
      const result = JSON.parse(data);

      if (result && result.employees && result.employees.length) {
        this.employees = JSON.parse(data).employees;
      }
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        throw error;
      }
      console.log("error rr", error);
      throw new Error(`Cannot load data ${this.filename} ${error.message}`);
    }
  }

  private save() {
    const data = JSON.stringify({ employees: this.employees }, null, 2);
    try {
      fs.writeFileSync(this.filename, data);
    } catch (err) {
      throw new Error("Internal server error: Data cannot be saved");
    }
  }
}
