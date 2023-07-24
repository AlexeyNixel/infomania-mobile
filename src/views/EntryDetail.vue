<script setup lang="ts">
import { useEntryStore } from '@/stores/entryStore';
import type { EntryType } from '@/models/baseModels';
import { onMounted, ref } from 'vue';
import '@/styles/ck.css';
import '@/styles/resize.css';
import { useRoute } from 'vue-router';

const route = useRoute();
const entryStore = useEntryStore();
const entry = ref<EntryType>();

onMounted(async () => {
  entry.value = await entryStore.getEntry(route.params.slug as string, {
    include: 'department',
  });
});
</script>

<template>
  <div class="entry" v-viewer>
    <div class="entry__header">
      <div class="entry__title">{{ entry?.title }}</div>
      <div class="entry__date">{{ entry?.publishedAt }}</div>
      <div class="entry__department">{{ entry?.department.title }}</div>
    </div>
    <div class="entry__content ck-content" v-html="entry?.content"></div>
  </div>
</template>

<style scoped lang="scss"></style>
