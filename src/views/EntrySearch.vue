<script setup lang='ts'>
import type { EntryType } from '@/models/baseModels';
import { useEntryStore } from '@/stores/entryStore';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EntryPlate from '@/components/UI/EntryPlate.vue';
import { useFilterStore } from '@/stores/filterStore';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore';

const route = useRoute();
const router = useRouter();
const search = ref<string>();
const entryStore = useEntryStore();
const filterStore = useFilterStore();
const globalStore = useGlobalStore();

const { dateFilterSelected } = storeToRefs(filterStore);
const { departmentFilter } = storeToRefs(filterStore);
const { isFilter } = storeToRefs(filterStore);
const { toDate } = storeToRefs(filterStore);

const entries = ref<EntryType[]>();

const dateSort:{[key: string]: string} = {
  'Сначала новые': '-publishedAt',
  'Сначала старые': 'publishedAt',
  '': '',
}

const handleSearch = () => {
  router.push({ name: 'search', query: { search: search.value } });
};
const handleOpenFilters = () => {
  isFilter.value = !isFilter.value
  console.log(isFilter.value);
};

const handleClearSearch = () => {
  search.value = '';
};

const dateFetching = async () => {
  search.value = route.query.search as string;
  const params = {
    include: 'preview',
    search: search.value,
    orderBy: dateSort[dateFilterSelected.value],
    toDate: filterStore.toDate,
    fromDate: filterStore.fromDate,
  };

  if (departmentFilter.value) {
    const { data } = await entryStore.getEntriesByDepartment(departmentFilter.value, params);
    entries.value = data;
  } else {
    const { data, meta } = await entryStore.getEntries(params);
    entries.value = data;
  }
};


onMounted(() => {
  dateFetching();
});

watch(route, () => {
  dateFetching();
});

watch(toDate, () => {
  dateFetching();
});

watch(dateFilterSelected, () => {
  dateFetching();
});

watch(departmentFilter, () => {
  dateFetching();
});
</script>

<template>

  <div class='search'>
    <div class='search__icon'>
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
    </div>
    <el-input @keyup.enter='handleSearch' v-model='search' class='search__input' />
    <el-button class='search__button search__button_filter' @click='handleOpenFilters'>
      <font-awesome-icon :icon="['fas', 'sliders']" />
    </el-button>
    <el-button class='search__button search__button_clear' @click='handleClearSearch'>
      <font-awesome-icon :icon="['fas', 'xmark']" />
    </el-button>
  </div>
  <div class='entry-list'>
    <div v-for='item in entries' :key='item.id'>
      <entry-plate :entry='item' />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.search {
  display: flex;
  align-items: center;
  height: max-content;
  background-color: var(--input-bg-color);
  border-radius: var(--border-radius-size);

  &__icon {
    height: 100%;
    background-color: var(--input-bg-color);
    margin: 0 10px;
    font-size: 14px;
  }

  &__button {
    background: var(--input-bg-color);

    &_clear {
      border-radius: 0 10px 10px 0 !important;
    }
  }
}

:deep(.el-button) {
  margin: 0;
  border-radius: 0;
  border: none;

}

:deep(.el-input__wrapper) {
  border-radius: 0;
  border: none;
  box-shadow: none;
  background-color: var(--input-bg-color);
  padding: 0;
}
</style>
