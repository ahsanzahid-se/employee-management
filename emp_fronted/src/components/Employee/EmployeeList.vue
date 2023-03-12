<template>
    <a-table :columns="employeeTableColumns" :data-source="employees" :pagination="false">
        <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'name'">
                <a>{{ text }}</a>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
                <a-space>
                    <a-button type="primary" @click="() => onEdit(record)"> Edit</a-button>

                    <a-popconfirm v-if="employees.length" title="Sure to delete?" @confirm="() => onDelete(record)">
                        <a-button type="primary" danger> Delete </a-button>
                    </a-popconfirm>
                </a-space>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import type { TableProps } from 'ant-design-vue';
import { employeeTableColumns } from '../../helper/constant';
import { useEmployeeStore } from '../../stores/employee';
import type { iEmployee } from '../../interfaces/iEmployee';
import { storeToRefs } from 'pinia';

export default defineComponent({
    setup() {
        const store = useEmployeeStore();
        const { fetchEmployees, deleteEmployee, selectEmployee } = store;
        onBeforeMount(async () => {
            await fetchEmployees();
        });
        const { selectedEmployee: selectedEmp, employees, selectedRowKeys } = storeToRefs(store)

        const onDelete = (record: iEmployee) => {
            deleteEmployee(record)
        }

        const onEdit = (record: iEmployee) => {
            selectEmployee(record);
        }

        return { selectedEmp, employees, employeeTableColumns, selectedRowKeys, onDelete, onEdit }
    }
});
</script>
  