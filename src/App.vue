<template>
  <header-mobile />
  <RouterView />
  <filters-menu />
</template>

<script setup lang="ts">
import HeaderMobile from '@/components/elements/HeaderMobile.vue';
import FiltersMenu from '@/components/elements/FiltersMenu.vue';
import { useTitle } from '@vueuse/core';

useTitle('НОМБ');
</script>

<style scoped></style>
