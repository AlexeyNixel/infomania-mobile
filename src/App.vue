<template>
  <header-mobile />
  <RouterView />
  <filters-menu />
</template>

<script setup lang='ts'>
import { RouterView } from 'vue-router';
import HeaderMobile from '@/components/elements/HeaderMobile.vue';
import FiltersMenu from '@/components/elements/FiltersMenu.vue';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore';
import { watch } from 'vue';

const globalStore = useGlobalStore();
const { isFiltersWindow } = storeToRefs(globalStore);

watch(isFiltersWindow, () => {
  document.querySelector('body')?.classList.toggle('frozen');
});
</script>

<style scoped></style>
