

<template>
  <div>
    <a-space direction="vertical">
      <a-form layout="inline" :model="formState" name="basic" autocomplete="off" @finish="onFinish">
        <a-form-item label="Search employe by Id: " name="employeeId"
          :rules="[{ required: true, message: 'Please input employee Id!' }]">
          <a-input v-model:value="formState.employeeId" placeholder="Employee Id">
            <template #prefix>
              <user-outlined type="user" />
            </template>
            <template #suffix>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">Search</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="() => $router.push('/employee/create')"> Add new employee</a-button>
        </a-form-item>

      </a-form>


    </a-space>
    <EmployeeList />

  </div>
</template>

<script lang="ts">
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, reactive } from 'vue';
import { useEmployeeStore } from '../stores/employee';
import EmployeeList from '../components/Employee/EmployeeList.vue';
import { message } from 'ant-design-vue';

export default defineComponent({
  components: {
    UserOutlined,
    InfoCircleOutlined,
    EmployeeList
  },

  setup() {
    const store = useEmployeeStore();
    const { fetchEmployeeById, deleteEmployee } = store

    const formState = reactive({
      employeeId: '',
    });
    const onFinish = ({ employeeId }: { employeeId: string }) => {
      fetchEmployeeById(employeeId)
    };

    return {
      formState,
      onFinish,
    };
  },
});
</script>