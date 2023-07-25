import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filters', {
  state: () => ({
    dateFilterSelected: '-publishedAt',
  }),
});
