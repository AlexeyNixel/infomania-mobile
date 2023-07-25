<script setup lang="ts">
import type { EntryResponseType, EntryType } from '@/models/baseModels';
import { useEntryStore } from '@/stores/entryStore';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import EntryPlate from '@/components/UI/EntryPlate.vue';
import { useFilterStore } from '@/stores/filterStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const search = ref<string>();
const filterStore = useFilterStore();

const { dateFilterSelected } = storeToRefs(filterStore);

const entryStore = useEntryStore();
const entries = ref<EntryType[]>();

const dateFetching = async () => {
  search.value = route.query.search as string;
  console.log(search.value);
  const { data, meta } = await entryStore.getEntries({
    include: 'preview',
    search: search.value,
    orderBy: dateFilterSelected.value,
  });
  entries.value = data;
};

onMounted(() => {
  dateFetching();
});

watch(route, () => {
  dateFetching();
});

watch(dateFilterSelected, () => {
  dateFetching();
});
</script>

<template>
  <div class="entry-list">
    <div v-for="item in entries" :key="item.id">
      <entry-plate :entry="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.entry-list {
}
</style>
