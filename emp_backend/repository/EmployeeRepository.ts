import { Employee } from "../interfaces/Employee";
import { Database } from "../interfaces/FileDatabase";

export class EmployeeRepository {
  private readonly db: Database<Employee>;
  constructor(db: Database<Employee>) {
    this.db = db;
  }
  getAll() {
    return this.db.getAll();
  }
  get(id: string) {
    return this.db.get(id);
  }
  
  getByEmail(email: string) {
    return this.db.getByEmail(email);
  }
  add(employee: Employee) {
    return this.db.add(employee);
  }
  update(employee: Employee) {
    return this.db.update(employee)
  }
  delete(id:string) {
    return this.db.delete(id)
}
}
