<template>
  <main>
    <slider-mobile />
    <navigation-mobile />
    <entry-list />
    <gos-uslugi />
  </main>
</template>

<script lang="ts" setup>
import HeaderMobile from '@/components/elements/HeaderMobile.vue';
import NavigationMobile from '@/components/elements/NavigationMobile.vue';
import SliderMobile from '@/components/elements/SliderMobile.vue';
import EntryList from '@/components/elements/EntryList.vue';
import GosUslugi from '@/components/elements/GosUslugi.vue';
import FiltersMenu from '@/components/elements/FiltersMenu.vue';
</script>
