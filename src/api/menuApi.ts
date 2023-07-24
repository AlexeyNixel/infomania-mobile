import { axiosApi } from './axios';
import { Routes } from './routes';

const { MENU_ROUTE } = Routes;

export const findMenus = async (params: any) => {
  const { data } = await axiosApi.get(MENU_ROUTE, { params });
  return data;
};
