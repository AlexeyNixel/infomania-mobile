import { axiosApi } from './axios';
import { Routes } from './routes';
import type { ParamsType } from "@/models/baseModels";

const { MENU_ROUTE } = Routes;
const { MENU_ITEM_ROUTE } = Routes;

export const findMenu = async (slug: string, params?: ParamsType) => {
  return await axiosApi.get(`${MENU_ITEM_ROUTE}${slug}`, { params })
}

export const findMenus = async (params: any) => {
  const { data } = await axiosApi.get(MENU_ROUTE, { params });
  return data;
};
