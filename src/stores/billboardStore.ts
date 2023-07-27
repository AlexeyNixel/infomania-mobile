import { defineStore } from 'pinia';
import { findBillboards } from '@/api/billboardApi';
import type { ParamsType } from '@/models/baseModels';

export const useBillboardStore = defineStore('billboard', () => {
  const getBillboards = async (params?: ParamsType) => {
    const { data } = await findBillboards(params);
    return data;
  };

  return {
    getBillboards,
  };
});
