import { defineStore } from 'pinia';
import moment from 'moment/moment';

export const useFilterStore = defineStore('filters', {
  state: () => ({
    isFilter: false,
    filterComponent: 'index',
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
    },
    generateDateArray () {
      const currentYear = Number(moment(new Date()).format('YYYY'));
      const array = [];
      for (let i = currentYear; i >= 2010; i--) {
        array.push(i);
      }
      return array;
    }
  }
});
