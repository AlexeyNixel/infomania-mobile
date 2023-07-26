import type { ParamsType } from '@/models/baseModels';
import { defineStore } from 'pinia';
import {
  findEntries,
  findEntriesByDepartment,
  findEntriesByRubric,
  findEntry,
} from '@/api/entryApi';

export const useEntryStore = defineStore('entry', () => {
  const getEntry = async (slug: string, params?: ParamsType) => {
    return await findEntry(slug, params);
  };
  const getEntries = async (params?: ParamsType) => {
    const { data, meta } = await findEntries(params);
    return { data, meta };
  };

  const getEntriesByRubric = async (slug: string, params?: ParamsType) => {
    const { data } = await findEntriesByRubric(slug, params);
    return data;
  };

  const getEntriesByDepartment = async (slug: string, params?: ParamsType): Promise<any> => {
    const { data, meta } = await findEntriesByDepartment(slug, params);
    return data;
  };

  return {
    getEntry,
    getEntries,
    getEntriesByRubric,
    getEntriesByDepartment,
  };
});
