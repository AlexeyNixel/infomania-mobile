<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore';
import type { MenuItemType } from '@/models/baseModels';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import moment from 'moment/moment';

const route = useRoute();
const slug = ref<string>(route.params.slug as string);
const menuStore = useMenuStore();
const document = ref<MenuItemType>();

onMounted(async () => {
  document.value = await menuStore.getMenu(slug.value, {
    include: 'document',
  });
});
</script>

<template>
  <div class="entry" v-viewer>
    <div class="entry__header">
      <div class="entry__title">{{ document?.document.title }}</div>
      <div class="entry__info">
        <div class="entry__date">
          {{ moment(document?.document.publishedAt).format('DD.MM.YYYY') }}
        </div>
      </div>
    </div>
    <div
      class="entry__content ck-content"
      v-html="document?.document.content"
    ></div>
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
    font-size: 1.1rem;
    font-weight: bold;
    margin: 1vw 0;
    padding-left: 10px;
    font-family: 'montserrat';
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
  }

  &__content {
    font-size: var(--regular-font-size);
    word-break: break-all;
    padding: 0 10px;
    font-family: 'montserrat';
  }
}
:deep(img) {
  width: 100% !important;
}
</style>
