
<template>
  <div :key="formType">
    <a-form layout="horizontal" :model="formState" name="employeeForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }"
      autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed" @resetFields="resetFields">
      <a-row>
        <a-col :span="3">

          <a-image v-if="imagePath" :width="200" :src="imagePath" :preview="false" />
          <a-image v-else :width="200" :src="fallbackImage" :preview="false" />

          <input ref="imageRef" type="file" @change="($event) => onFileChanged($event)" accept="image/*" capture />
          <a-button v-if="imagePath" @click="clearImageField" danger>Clear file</a-button>
        </a-col>
        <a-col :span="21">
          <a-row>
            <a-col :span="8">
              <a-form-item label="First Name" name="firstName"
                :rules="[{ required: true, message: 'Field is required!' }]">
                <a-input v-model:value="formState.firstName" />
              </a-form-item>
            </a-col>


            <a-col :span="8">
              <a-form-item label="Middle name" name="middleName"
                :rules="[{ required: false, message: 'Field is required!' }]">
                <a-input v-model:value="formState.middleName" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="Last Name" name="lastName" :rules="[{ required: true, message: 'Field is required!' }]">
                <a-input v-model:value="formState.lastName" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="Birhtday" name="birthdate" :rules="[{ required: true, message: 'Field is required!' }]">
                <!-- <a-input v-model:value="formState.birthdate" /> -->
                <a-date-picker v-model:value="formState.birthdate" :valueFormat="dateFormat" :format="dateFormat" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item name="email" label="Email" :rules="[
                { type: 'email', required: true, message: 'Field is required!' },
              ]">
                <a-input v-model:value="formState.email" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="Phone Number" name="phoneNumber"
                :rules="[{ required: true, message: 'Field is required!' }]">
                <a-input v-model:value="formState.phoneNumber" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item :name="['address', 'line1']" label="Line1"
                :rules="[{ required: true, message: 'Field is required!' }]">
                <a-input v-model:value="formState.address.line1" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item :name="['address', 'line2']" label="Line2">
                <a-input v-model="formState.address.line2" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item :name="['address', 'city']" label="city"
                :rules="[{ required: true, message: 'Field is required!' }]">
                <a-input v-model:value="formState.address.city" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item :name="['address', 'zip']" label="Zip"
                :rules="[{ required: true, message: 'Field is required!' }]">
                <a-input v-model:value="formState.address.zip" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item :name="['address', 'country']" label="Country"
                :rules="[{ required: true, message: 'Field is required!' }]">
                <a-input v-model:value="formState.address.country" />
              </a-form-item>
            </a-col>
          <!-- <a-form-item label="Profile Picture" name="profilePicture">
      <a-input v-model:value="formState.profilePicture" />
        </a-form-item> -->

            <a-col :span="8">
              <a-form-item name="supervisorId" label="Supervisor">
                <a-select allowClear="{{true}}" :options="supervisors" v-model:value="formState.supervisorId" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts">

import { useEmployeeStore } from '../../stores/employee';
import type { iEmployee } from '../../interfaces/iEmployee';
import { defineComponent, reactive, toRef, ref, onMounted } from 'vue';
import { employeeDTO } from '../../helper/constant'
import { Form, message } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { v4 as uuidv4 } from "uuid";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { fallbackImage } from '../../helper/fallbackImg';


export default defineComponent({

  props: ['type'],
  emits: ['update:type'],
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  setup(props) {
    const useForm = Form.useForm;

    const dateFormat = 'YYYY/MM/DD';
    const { type } = props;
    const uploading = ref<boolean>(false);
    const store = useEmployeeStore();
    const { addEmp, updateEmployee, setFile } = store
    const { selectedEmployee, employees } = storeToRefs(store)
    const selectedEmp: iEmployee = selectedEmployee && selectedEmployee.value ? { ...selectedEmployee.value, address: { ...selectedEmployee.value?.address } } : employeeDTO;
    const imageRef = ref<HTMLInputElement | null>(null);
    const imagePath = ref<string | null>(selectedEmp.profilePicture)
    const supervisors = employees && employees.value && employees.value.filter(e => e.id !== selectedEmp.id).map((v) => {
      return {
        label: `${v.firstName} ${v.lastName}`,
        value: v.id
      }
    })
    const s_id = selectedEmp.supervisor ? selectedEmp.supervisor.id : null
    const formData: iEmployee = type === "update" ? { ...selectedEmp, supervisorId: s_id } : employeeDTO
    const formState: iEmployee = reactive<iEmployee>({ ...formData, supervisorId: formData.supervisorId });
    const formType = toRef(props, 'type')
    const { resetFields, validate, validateInfos } = useForm(formState);

    const onFinish = (values: any,) => {
      const birthdate = values.birthdate
      if (type === "create") {
        const id = uuidv4();
        addEmp({ ...values, id })
      }
      else {
        updateEmployee(values)
      }
      imagePath.value = null;
      resetFields({ ...employeeDTO, address: { ...employeeDTO.address } })
      setFile(null)

    };

    const onFinishFailed = (errorInfo: any) => {
      console.log(errorInfo)
      message.info("Please check the form for errors!")
    };


    const file = ref<File | null>();
    function onFileChanged($event: Event) {
      const target = $event.target as HTMLInputElement;
      if (target && target.files) {
        file.value = target.files[0];
        setFile(file.value)
        imagePath.value = URL.createObjectURL(file.value)
      }
    }

    function clearImageField() {
      setFile(null);
      if (imageRef.value) {
        imageRef.value.value = "";
      }
      file.value = null;
      imagePath.value = null;
    }
    return {
      dateFormat,
      fallbackImage, imageRef,
      imagePath, onFileChanged,
      uploading, supervisors,
      selectedEmployee, formType,
      formState, onFinish,
      onFinishFailed, resetFields,
      clearImageField
    }
  }


});
</script>
