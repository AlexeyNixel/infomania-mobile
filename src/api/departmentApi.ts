import type { ParamsType } from '@/models/baseModels';
import { axiosApi } from '@/api/axios';
import { Routes } from '@/api/routes';

const { DEPARTMENT_ROUTE } = Routes;

export const findDepartments = async (params?: ParamsType) => {
  const { data } = await axiosApi.get(DEPARTMENT_ROUTE, { params });
  return data;
};