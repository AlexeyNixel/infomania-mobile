import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filters', {
  state: () => ({
    dateFilterSelected: 'Сначала новые',
    fromDate: '',
    toDate: '',
    departmentFilter: '',
  }),
  actions: {
    generateDate (currentYear: string) {
      this.fromDate = `${currentYear}-01-01T00:00:00.000Z`;
      this.toDate = `${currentYear}-12-31T00:00:00.000Z`;
    },

    clearFilter () {
      this.dateFilterSelected = 'Сначала новые'
      this.fromDate = ''
      this.toDate = ''
      this.departmentFilter = ''
    }
  }
});
