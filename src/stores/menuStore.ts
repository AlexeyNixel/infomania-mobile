import { findMenu, findMenus } from '@/api/menuApi';
import { defineStore } from 'pinia';
import type { ParamsType } from "@/models/baseModels";

export const useMenuStore = defineStore('menu', () => {
  const getMenu = async (slug: string, params?: ParamsType) => {
    const { data } = await findMenu(slug, params)
    return data
  }

  const getMenus = async (params?: ParamsType) => {
    const { data } = await findMenus(params);
    return data;
  };

  return {
    getMenu,
    getMenus,
  };
});
