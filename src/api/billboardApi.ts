import type { ParamsType } from '@/models/baseModels';
import { axiosApi } from '@/api/axios';
import { Routes } from '@/api/routes';

const { AFFICHE_ROUTE } = Routes;

export const findBillboards = async (params: ParamsType) => {
  const { data } = await axiosApi.get(AFFICHE_ROUTE, { params });
  return data;
};
