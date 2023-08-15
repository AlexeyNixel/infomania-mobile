import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isFiltersWindow: false,
    isWorkTime: false,
    isLibraryOnMap: false,
  }),
});
