import { defineStore } from 'pinia';
import type { DepartmentType, ParamsType } from '@/models/baseModels';
import { findDepartments } from '@/api/departmentApi';
import { ref } from 'vue';

export const useDepartmentStore = defineStore('department', () => {
  const departments = ref<DepartmentType[]>()
  const getDepartments = async (params?: ParamsType) => {
    const { data } = await findDepartments(params);
    departments.value = data
    return data;
  };

  return {
    getDepartments,
  };
});