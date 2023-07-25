import { defineStore } from 'pinia';
import { findEntries, findEntriesByRubric, findEntry } from '@/api/entryApi';
import type { ParamsType } from '@/models/baseModels';

export const useEntryStore = defineStore('entry', () => {
  const getEntry = async (slug: string, params?: ParamsType) => {
    return await findEntry(slug, params);
  };
  const getEntries = async (params?: ParamsType) => {
    const { data, meta } = await findEntries(params);
    return {data, meta};
  };

  const getEntriesByRubric = async (slug: string, params?: ParamsType) => {
    const { data } = await findEntriesByRubric(slug, params);
    return data;
  };

  return {
    getEntry,
    getEntries,
    getEntriesByRubric,
  };
});
