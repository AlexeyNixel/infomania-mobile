<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import { useFilterStore } from '@/stores/filterStore';

const route = useRoute();

const search = ref<string>();
const globalStore = useGlobalStore();
const filterStore = useFilterStore();
const { dateFilterSelected } = storeToRefs(filterStore);
const date = ref<string>('Сначала новые');

const { isFiltersWindow } = storeToRefs(globalStore);

// filters option
const dateFilter = [
  {
    title: 'Сначала новые',
    value: '-publishedAt',
  },
  {
    title: 'Сначала cтарые',
    value: 'publishedAt',
  },
];

const closeFilterMenu = (e: Event) => {
  const filterMenu = document.querySelector('.filters');
  const clearBtn = document.querySelector('.filters-header__clear');
  if (e.target !== filterMenu && e.target !== clearBtn)
    globalStore.isFiltersWindow = !globalStore.isFiltersWindow;
};
const toggleEventListener = (isOpen: boolean) => {
  if (isOpen) {
    window.addEventListener('click', closeFilterMenu);
  } else {
    window.removeEventListener('click', closeFilterMenu);
  }
};
watch(isFiltersWindow, (val: boolean) => {
  setTimeout(() => toggleEventListener(val), 300);
});
</script>

<template>
  <Transition name="opacity" :duration="550">
    <div
      class="substrate"
      v-if="isFiltersWindow"
      style="transition: all 0.3s"
    />
  </Transition>
  <Transition name="nested" :duration="550">
    <div class="filters outer" v-if="isFiltersWindow">
      <div class="filters-header">
        <div class="filters-header__clear filters-header__item">Очистить</div>
        <div class="filters-header__title filters-header__item">Фильтры</div>
        <div class="filters-header__close filters-header__item">
          <font-awesome-icon
            class="filters-header__icon"
            :icon="['fas', 'xmark']"
          />
        </div>
      </div>
      <div class="filters__item">
        <div class="filters__title">По дате</div>
        <el-select
          v-model="dateFilterSelected"
          class="filters__item"
          :placeholder="date"
          size="small"
        >
          <el-option
            v-for="item in dateFilter"
            :key="item.value"
            :label="item.title"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.filters {
  position: absolute;
  background-color: var(--element-bg-color);
  width: 100%;
  min-height: 60vh;
  bottom: 0;
  left: 0;
  padding: 10px;
  border-radius: var(--border-radius-size) var(--border-radius-size) 0 0;

  &__title {
    font-size: 0.8rem;
  }
  &__item {
    padding: 5px 0;
    width: 100%;
    font-size: 0.8rem;
  }
}

:deep(.el-input__inner) {
  font-size: 0.7rem;
}

:deep(.el-select-dropdown__item) {
  font-size: var(--regular-font-size);
}
.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  padding-bottom: 10px;

  &__item {
    width: 33.33%;
  }

  &__title {
    text-align: center;
    font-weight: bold;
    font-size: 1.3rem;
  }

  &__clear {
    font-size: 0.8rem;
  }

  &__close {
    text-align: end;
    //font-size: 0.8rem;
  }

  &__icon {
    background: gray;
    padding: 5px;
    height: 10px;
    width: 10px;
    border-radius: 50px;
  }
}

.substrate {
  pointer-events: all;
  background-color: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.inner {
  background: #ccc;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}

.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.opacity-enter-active,
.opacity-leave-active {
  opacity: 0.5;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>
