<script setup lang="ts">
import { useEntryStore } from '@/stores/entryStore';
import { onMounted, ref } from 'vue';
import type { EntryType } from '@/models/baseModels';

const rubrics: Array<string> = ['aktualnoe', 'anonsy', 'sobytiya'];
const rubricsTranslate: { [key: string]: string } = {
  aktualnoe: 'Актуальное',
  anonsy: 'Анонсы',
  sobytiya: 'События',
};
const staticUrl = import.meta.env.VITE_STATIC_URL;
const entryStore = useEntryStore();
const entries = ref<{ data: EntryType[]; meta: any }>();
const menus = ref<any>({});

onMounted(async () => {
  for (let rubric of rubrics) {
    entries.value = await entryStore.getEntriesByRubric(rubric, {
      pageSize: 6,
      include: 'preview,rubrics',
      orderBy: '-publishedAt',
    });
    menus.value[rubric] = entries.value?.data;
  }
  entries.value = await entryStore.getEntriesByRubric('sobytiya', {
    pageSize: 6,
    include: 'preview,rubrics',
    orderBy: '-publishedAt',
  });
});
</script>

<template>
  <div class="entry-list" v-for="(items, rubric) in menus" :key="rubric">
    <div class="entry-list__rubric"></div>
    <el-scrollbar class="entry-list__container">
      <div class="entry-list__flex">
        <router-link
          to="#"
          class="entry-item__link"
          v-for="item in items"
          :key="item.id"
        >
          <div class="entry-item__img">
            <img :src="staticUrl + item?.preview.path" alt="" />
          </div>
          <div class="entry-item__content">
            <div class="entry-item__title">
              {{ item.title.slice(0, 50) + '...' }}
            </div>
            <div class="entry-item__rubric">{{ rubricsTranslate[rubric] }}</div>
          </div>
        </router-link>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.entry-list {
  &__rubric {
    width: 100%;
    margin: 1vh 0;
    border-bottom: 1px solid var(--element-bg-color);
    border-radius: 1px;
  }
  &__flex {
    display: flex;
  }
}

.entry-item {
  &__link {
    height: 250px;
    width: 200px;
    flex-shrink: 0;
    margin-right: 10px;
    background: var(--element-bg-color);
    border-radius: var(--border-radius-size);
    text-decoration: none;
    color: var(--font-color);
  }
  &__img {
    height: 60%;
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
      border-radius: var(--border-radius-size) var(--border-radius-size) 0 0;
    }
  }
  &__content {
    height: 40%;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  &__title {
    text-align: center;

    font-size: var(--regular-font-size);
    height: 75%;
  }

  &__rubric {
    border: 1px solid gray;
    width: max-content;
    border-radius: 20px;
    padding: 4px 10px;
    align-self: end;
    font-size: var(--regular-font-size);
  }
}
</style>
