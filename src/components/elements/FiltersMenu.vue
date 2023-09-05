<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useFilterStore } from '@/stores/filterStore';
import SortTemplate from '@/components/elements/filterElements/SortTemplate.vue';
import DepartmentSortTemplate from '@/components/elements/filterElements/DepartmentSortTemplate.vue';
import MainSort from '@/components/elements/filterElements/MainSort.vue';

const filterStore = useFilterStore();

const { isFilter } = storeToRefs(filterStore);
const { filterComponent } = storeToRefs(filterStore);

const isSortOpen = ref<boolean>(false);

const component: { [key: string]: any } = {
  sort: SortTemplate,
  depart: DepartmentSortTemplate,
  index: MainSort,
};

const closeFilterMenu = () => {
  if (filterComponent.value !== 'index') {
    filterComponent.value = 'index';
    return;
  }
  isFilter.value = !isFilter.value;
};

watch(isFilter, () => {
  if (!isFilter.value) document.body.style.overflow = '';
  else document.body.style.overflow = 'hidden';
});
</script>

<template>
  <Transition name="opacity" :duration="300">
    <div
      class="substrate"
      v-if="isFilter || isSortOpen"
      style="transition: all 0.3s"
      @click="closeFilterMenu"
    />
  </Transition>
  <Transition name="nested" :duration="300">
    <component v-if="isFilter" :is="component[filterComponent]"></component>
  </Transition>
</template>

<style scoped lang="scss">
.filters {
  position: absolute;
  background-color: var(--element-bg-color);
  width: 100%;
  min-height: 30vh;
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

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d5d6d7;
  padding-bottom: 10px;
  height: 5vh;

  &__item {
    width: 50%;
  }

  &__title {
    text-align: left;
    font-weight: bold;
    font-size: 1.3rem;
  }

  &__clear {
    font-size: 0.8rem;
    text-align: right;
  }

  &__close {
    text-align: end;
  }

  &__icon {
    background: gray;
    padding: 5px;
    height: 10px;
    width: 10px;
    border-radius: 50px;
  }
}

.filters-content {
  padding: 10px 0;

  &__item {
    padding: 10px 0;
    width: 100%;

    .el-select {
      width: 100%;
      background: var(--input-bg-color);
      border-radius: 10px;
    }
  }

  &__title {
    padding-bottom: 5px;
    font-size: var(--regular-font-size);
  }

  &__flex {
    display: flex;
  }

  &__year {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: none;
    padding: 15px;
    margin-right: 10px;
    background: var(--input-bg-color);
    font-size: var(--regular-font-size);

    &:active {
      background: none;
      transition: 0.1s;
    }
  }
}

:deep(.el-input__wrapper) {
  background: var(--input-bg-color);
  border-radius: 10px;
  border: none;
  box-shadow: none;
}

:deep(.el-scrollbar__bar.is-horizontal) {
  display: none;
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

// Animations
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.opacity-enter-active,
.opacity-leave-active {
  transition: all 0.3s ease-in-out;
  opacity: 0.5;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>
