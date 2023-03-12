import type { iEmployee } from "./iEmployee";

export interface iEmployeeState {
  employees: iEmployee[];
  selectedEmployee: iEmployee | null;
  selectedRowKeys: string[] | null | number[];
}
