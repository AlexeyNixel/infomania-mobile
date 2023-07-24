import type { ParamsType } from '@/models/baseModels';
import { axiosApi } from '@/api/axios';
import { Routes } from '@/api/routes';

const { ENTRY_ROUTE } = Routes;
const { RUBRIC_ROUTE } = Routes;

export const findEntry = async (slug: string, params?: ParamsType) => {
  const { data } = await axiosApi.get(`${ENTRY_ROUTE}${slug}`, { params });
  return data;
};

export const findEntries = async (params?: ParamsType) => {
  const { data } = await axiosApi.get(ENTRY_ROUTE, { params });
  return data;
};

export const findEntriesByRubric = async (
  slug?: string,
  params?: ParamsType,
): Promise<any> => {
  //@ts-ignore
  const { data, meta } = await axiosApi.get(`${RUBRIC_ROUTE}${slug}/entries`, {
    params: params,
  });
  return { data, meta };
};
