<template>
  <main>
    <slider-mobile />
    <navigation-mobile />
    <calendar-event />
    <entry-list />
    <gos-uslugi />
    <footer-mobile />
  </main>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core';
import FooterMobile from '@/components/elements/FooterMobile.vue';
import SliderMobile from '@/components/elements/SliderMobile.vue';
import NavigationMobile from '@/components/elements/NavigationMobile.vue';
import CalendarEvent from '@/components/elements/CalendarEvent.vue';
import EntryList from '@/components/elements/EntryList.vue';
import GosUslugi from '@/components/elements/GosUslugi.vue';

useTitle('НОМБ');
</script>

<style scoped lang="scss"></style>
