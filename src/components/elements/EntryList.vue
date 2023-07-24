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
    console.log(rubric);
    entries.value = await entryStore.getEntriesByRubric(rubric, {
      pageSize: 6,
      include: 'preview,rubrics',
      orderBy: '-publishedAt',
    });
    menus.value[rubric] = entries.value?.data;
  }
  console.log(menus.value);
  entries.value = await entryStore.getEntriesByRubric('sobytiya', {
    pageSize: 6,
    include: 'preview,rubrics',
    orderBy: '-publishedAt',
  });
});
</script>

<template>
  <div class="entry-list" v-for="(items, rubric) in menus" :key="rubric">
    <div class="entry-list__rubric-title">
      {{ rubricsTranslate[rubric] }}
    </div>
    <el-scrollbar>
      <div class="entry-list__item">
        <router-link
          :to="{ name: 'entry', params: { slug: entry.slug } }"
          v-for="entry in items"
          :key="entry.id"
          class="entry-list__link"
        >
          <img
            :src="staticUrl + entry.preview.path"
            alt=""
            class="entry-list__img"
          />
          {{ entry.title.slice(0, 60) + '...' }}
        </router-link>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.entry-list {
  &__item {
    display: flex;
    padding: 10px 5px;
  }

  &__link {
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    flex-shrink: 0;
    width: 200px;
    height: 250px;
    margin-right: 10px;
    text-align: center;
    border-radius: 20px;
    font-size: 0.8rem;
    text-decoration: none;
    color: black;
  }

  &__img {
    width: 100%;
    height: 60%;
    overflow: hidden;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }
}
</style>
