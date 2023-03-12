import type { iEmployee } from "@/interfaces/iEmployee";
import type { TableProps, TableColumnType } from 'ant-design-vue';

export const employeeDTO: iEmployee = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: {
    line1: "",
    line2: "",
    city: "",
    zip: "",
    country: "",
  },
  birthdate: "",
  profilePicture: null,
  supervisorId: null,
  supervisor: null,
  id: "",
};


export const employeeTableColumns: TableColumnType<iEmployee>[] = [
    {
        key: 'firstName',
        title: 'First name',
        dataIndex: 'firstName',
        // resizable: true,
        // width:"50"
    },
    {
        key: 'middleName',
        title: 'Middle name',
        dataIndex: 'middleName',
        // resizable: true,
        // width:"50"
    },
    {
        key: 'lastName',
        title: 'Last name',
        dataIndex: 'lastName',
    },
    {
        key: 'email',
        title: 'Email',
        dataIndex: 'email',
    },
    {
        key: 'phoneNumber',
        title: 'Phone number',
        dataIndex: 'phoneNumber',
    },
    {
        key: 'line1',
        title: 'Line1',
        dataIndex: ['address', 'line1'],
    },
    {
        key: 'line2',
        title: 'Line2',
        dataIndex: ['address', 'line2'],
    },
    {
        key: 'city',
        title: 'City',
        dataIndex: ['address', 'city'],
    },
    {
        key: 'zip',
        title: 'Zip',
        dataIndex: ['address', 'zip'],
    },
    {
        key: 'Country',
        title: 'Country',
        dataIndex: ['address', 'country'],
    },
    {
        key: 'supervisor',
        title: 'Supervisor',
        dataIndex: ['supervisor', 'firstName'],
    },
    {
        key: "operation",
        dataIndex: "operation",
        title: "Actions"

    }

];