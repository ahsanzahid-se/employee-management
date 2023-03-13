import { defineStore } from "pinia";
import type { iEmployee } from "../interfaces/iEmployee";
import { useQuery, useMutation } from "@vue/apollo-composable";
import {
  EMPLOYEES_QUERY,
  EMPLOYEE_QUERY,
  GET_UPLOAD_URL,
} from "@/graphql/employee/queries";
import {
  ADD_EMPLOYEE_MUTATION,
  DELETE_EMPLOYEE_MUTATION,
  UPDATE_EMPLOYEE_MUTATION,
} from "@/graphql/employee/mutations";
import type { iEmployeeState } from "../interfaces/iEmployeeState";
import { message } from "ant-design-vue";
import type { GraphQLError } from "graphql";
import { uploadImage } from "@/helper/ImageHandler";

export const useEmployeeStore = defineStore({
  id: "employee",
  state: () => ({
    employees: [] as iEmployee[],
    selectedEmployee: null as iEmployee | null,
    selectedRowKeys: null as string[] | null | number[],
    image: null as File | null,
  }),

  getters: {
    getEmployees: (state: iEmployeeState) => {
      return state.employees;
    },
    getEmployeeById: (state: iEmployeeState) => (id: string) => {
      return (
        state.employees.find((employee: iEmployee) => employee.id === id) ||
        null
      );
    },
    getSelectedEmployee: (state: iEmployeeState) => {
      return state.selectedEmployee;
    },
  },

  actions: {
    setFile(img: File | null) {
      this.image = img;
    },

    fetchEmployeeById(id: string) {
      try {
        const { onResult } = useQuery(
          EMPLOYEE_QUERY,
          { id: id },
          {
            fetchPolicy: "network-only",
          }
        );
        onResult((res) => {
          if (!res.errors) {
            const { employee } = res.data;
            if (employee) {
              this.employees = employee ? [employee] : [];
            } else {
              message.info("No employee found for this id.");
            }
          }
        });
      } catch (err) {
        message.error("Error while fetching employee!");
      }
    },

    fetchEmployees() {
      try {
        const { onResult } = useQuery(
          EMPLOYEES_QUERY,
          {},
          { fetchPolicy: "network-only" }
        );
        onResult((res) => {
          if (!res.errors) {
            const emps =
              res.data?.employees.map((v: iEmployee) => {
                return { ...v, key: v.id };
              }) || [];
            this.employees = emps;
          }
        });
      } catch (err) {
        message.error("Error while fetching employees!");
      }
    },

    selectEmployee(employee: iEmployee) {
      this.selectedEmployee = employee;
      this.$router.push("employee/update");
    },
    async getUploadURL(id: string): Promise<{
      error: boolean;
      result: string | null;
      errorMessage: GraphQLError[] | null;
    }> {
      const { onResult } = useQuery(GET_UPLOAD_URL, { id });
      return await new Promise((resovle, reject) => {
        onResult((res) => {
          if (!res.errors) {
            const { getUploadURL } = res.data;

            resovle({ error: false, result: getUploadURL, errorMessage: null });
          } else {
            reject({ error: true, result: null, errorMessage: res.errors });
          }
        });
      });
    },

    async addEmp(employee: iEmployee) {
      try {
        const emps = [...this.employees];
        let profilePicture = null;

        if (this.image) {
          profilePicture =  "image"
          await uploadImage(employee.id, this.image);
        }
        const { mutate } = useMutation(ADD_EMPLOYEE_MUTATION);
        const { data = {} }: any = await mutate({
          employee: {
            ...employee,
            supervisor: null,
            profilePicture: profilePicture
          },
        });
        const { addEmployee = {} } = data;
        if (Object.keys(addEmployee).length) {
          const updatedEmployees = [...this.employees];
          updatedEmployees.push({ ...addEmployee });
          this.employees = updatedEmployees;
          this.$router.push("/");
        }
        message.success("Employee added successfully.", 5);
      } catch (err: any) {
        let errMessage = err && err.message ? err.message : "Error while uploading Employee!"
        message.error(errMessage, 5);
      }
    },
    async updateEmployee(employee: iEmployee) {
      try {
        let profilePicture = null;
        if (this.image) {
          await uploadImage(employee.id, this.image);
          profilePicture =  "image"
        }

        const { mutate } = useMutation(UPDATE_EMPLOYEE_MUTATION);
        const { data = {} }: any = await mutate({
          id: this.selectedEmployee.id,
          employee: {
            ...employee,
            id: this.selectedEmployee.id,
            profilePicture: profilePicture
          },
        });
        const { updateEmployee } = data;
        let employees = [...this.employees];
        const index = this.employees.findIndex(
          (e: iEmployee) => e.id === updateEmployee.id
        );

        if (index !== -1) {
          employees[index] = updateEmployee;
          this.employees = employees;
          this.$router.push("/");
          message.success("Employee updated successfully.");
        }
      } catch (err) {
        message.error("Employee cannot be updated");
      }
    },
    async deleteEmployee(employee: iEmployee) {
      try {
        const { mutate } = useMutation(DELETE_EMPLOYEE_MUTATION);
        const { data = {} }: any = await mutate({ id: employee.id });
        const { deleteEmployee } = data;

        if (deleteEmployee) {
          const employees = this.employees.filter(
            (e: iEmployee) => e.id !== deleteEmployee
          );
          this.employees = employees;
          this.selectedEmployee = null;
          this.selectedRowKeys = null;
          message.info("Employee deteled successfully.");
        } else {
          message.error("Error occurred while deleting employee!");
        }
      } catch (err) {
        message.error("err");
      }
    },
  },
});
