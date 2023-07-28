import { defineStore } from 'pinia';
import { findBillboards } from '@/api/billboardApi';
import type { BillboardType, ParamsType } from '@/models/baseModels';
import { ref } from 'vue';

export const useBillboardStore = defineStore('billboard', () => {

  const isCalendar = ref<boolean>(false)
  const currentEvent = ref<BillboardType[]>([])

  const getBillboards = async (params?: ParamsType):Promise<BillboardType[]> => {
    const { data } = await findBillboards({ ...params });
    return data;
  };

  const getBillboardsByDate = async (fromDate: string, toDate: string, params?: ParamsType) => {
    const { data } = await findBillboards({
      fromDate: fromDate + 'T00:00:00.000Z',
      toDate: toDate + 'T00:00:00.000Z',
      ...params,
    });
    return data
  };

  return {
    isCalendar,
    currentEvent,
    getBillboards,
    getBillboardsByDate
  };
});
