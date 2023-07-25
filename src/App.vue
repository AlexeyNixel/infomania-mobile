<template>
  <header-mobile />
  <RouterView />
  <filters-menu />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderMobile from '@/components/elements/HeaderMobile.vue';
import FiltersMenu from '@/components/elements/FiltersMenu.vue';
</script>

<style scoped></style>
