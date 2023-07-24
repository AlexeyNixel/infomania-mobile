import { findMenus } from '@/api/menuApi';
import { defineStore } from 'pinia';
import type {ParamsType} from "@/models/baseModels";

export const useMenuStore = defineStore('menu', () => {
  const getMenus = async (params?: ParamsType) => {
    const { data } = await findMenus(params);
    return data;
  };

  return {
    getMenus,
  };
});
