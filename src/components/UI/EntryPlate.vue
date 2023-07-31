<script setup lang="ts">
import type { EntryType } from '@/models/baseModels';
import BaseImage from '@/components/icons/BaseImage.vue';

type PropsType = {
  entry: EntryType;
};
const staticUrl = import.meta.env.VITE_STATIC_URL;
defineProps<PropsType>();
</script>

<template>
  <router-link
    :to="{ name: 'entry', params: { slug: entry.slug } }"
    class="entry"
  >
    <img
      v-if="entry.preview?.path"
      :src="staticUrl + entry.preview?.path"
      alt=""
      class="entry__img"
    />
    <div class="entry__img" v-else>
      <base-image class="entry__img_svg" />
    </div>

    <div class="entry__title">
      {{ entry.title.slice(0, 120) + '...' }}
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.entry {
  display: flex;
  align-items: center;
  margin: 2vw 0;

  text-decoration: none;
  color: var(--font-color);

  &__img {
    width: 30%;
    border-radius: var(--border-radius-size) 0 0 var(--border-radius-size);
    &_svg {
      width: 100%;
    }
  }

  &__title {
    margin-left: 10px;
    font-size: var(--regular-font-size);
    width: 70%;
  }
}
</style>
