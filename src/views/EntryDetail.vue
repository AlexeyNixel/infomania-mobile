<script setup lang="ts">
import { useEntryStore } from '@/stores/entryStore';
import type { EntryType } from '@/models/baseModels';
import { onMounted, ref } from 'vue';
import '@/styles/ck.css';
import '@/styles/resize.css';
import { useRoute } from 'vue-router';
import moment from 'moment'

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
      <div class="entry__info">
        <div class="entry__date">{{ moment(entry?.publishedAt).format('DD.MM.YYYY') }}</div>
        <router-link to="" class="entry__department">{{ entry?.department.title }}</router-link>
      </div>
    </div>
    <div class="entry__content ck-content" v-html="entry?.content"></div>
  </div>
</template>

<style scoped lang="scss">
:deep(a) {
  text-decoration: none;
  font-weight: bold;
  color: #1d5deb;
}

.entry {
  &__title {
    font-size: var(--title-font-size);
    font-weight: bold;
    margin: 1vw 0;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__date {
    font-style: italic;
    font-size: var(--regular-font-size);
  }

  &__department {
    color: #1d5deb;
    font-weight: bold;
    text-decoration: none;
    font-size: var(--regular-font-size);
  }

  &__content {
    font-size: var(--regular-font-size);
  }
}
</style>
