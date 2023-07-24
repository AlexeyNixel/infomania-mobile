<template>
  <header-mobile />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderMobile from '@/components/elements/HeaderMobile.vue';
</script>

<style scoped></style>
