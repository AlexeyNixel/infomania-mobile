<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useGlobalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import { useFilterStore } from '@/stores/filterStore';
import moment from 'moment';
import { useDepartmentStore } from '@/stores/departmentStore';
import type { DepartmentType } from '@/models/baseModels';
import SortTemplate from '@/components/elements/filterElements/SortTemplate.vue';
import DepartmentSortTemplate from '@/components/elements/filterElements/DepartmentSortTemplate.vue';

const component: { [key: string]: any } = {
  'sort': SortTemplate,
  'depart': DepartmentSortTemplate,
};

const currentComponent = ref<string>();

const globalStore = useGlobalStore();
const filterStore = useFilterStore();
const departmentStore = useDepartmentStore();

const departments = ref<DepartmentType[]>();

const { isFiltersWindow } = storeToRefs(globalStore);
const { dateFilterSelected } = storeToRefs(filterStore);
const { departmentFilter } = storeToRefs(filterStore);

const isSortOpen = ref<boolean>(false);

const swapWindow = (model: string) => {
  isFiltersWindow.value = !isFiltersWindow.value;
  isSortOpen.value = !isSortOpen.value;
  currentComponent.value = model;
};

onMounted(async () => {
  departments.value = await departmentStore.getDepartments();
});

const generateYearArray = () => {
  const currentYear = Number(moment(new Date()).format('YYYY'));
  let array = [];
  for (let i = currentYear; i >= 2010; i--) {
    array.push(i);
  }
  return array;
};

const closeFilterMenu = (e: Event) => {
  const filterMenu = document.querySelector('.substrate');
  if (isSortOpen.value) {
    isFiltersWindow.value = !isFiltersWindow.value;
    isSortOpen.value = !isSortOpen.value;
    return;
  }
  if (e.target === filterMenu)
    globalStore.isFiltersWindow = !globalStore.isFiltersWindow;
};
</script>

<template>
  <Transition name='opacity' :duration='300'>
    <div
      class='substrate'
      v-if='isFiltersWindow || isSortOpen'
      style='transition: all 0.3s'
      @click='closeFilterMenu'
    />
  </Transition>
  <Transition name='nested' :duration='300'>
    <div class='filters outer' v-if='isFiltersWindow '>
      <div class='filters-header'>
        <div class='filters-header__title filters-header__item'>Фильтры</div>
        <div class='filters-header__clear filters-header__item'
             @click='filterStore.clearFilter'>Очистить
        </div>
      </div>
      <div class='filters-content'>
        <div class='filters-content__item'>
          <div class='filters-content__title'>Сортировка</div>
          <el-select
            disabled
            @click='swapWindow("sort")'
            v-model='dateFilterSelected'
            placeholder='123'
          />
        </div>
        <div class='filters-content__item'>
          <div class='filters-content__title'>Определенный год</div>
          <el-scrollbar>
            <div class='filters-content__flex'>
              <div
                v-for='item in generateYearArray()'
                :key='item'
                class='filters-content__year'
                @click='filterStore.generateDate(item.toString())'
              >
                {{ item }}
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class='filters-content__item'>
          <div class='filters-content__title'>По отделу</div>
          <el-select
            disabled
            @click='swapWindow("depart")'
            v-model='departmentFilter'
            placeholder='Отдел'
          >
            <el-option
              v-for='item in departments'
              :key='item.slug'
              :label='item.title'
              :value='item.slug'
            />
          </el-select>
        </div>
      </div>
    </div>
  </Transition>
  <Transition name='nested' :duration='300'>
    <component v-if='isSortOpen' :is='component[currentComponent]'></component>
  </Transition>
</template>

<style scoped lang='scss'>
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
  border-bottom: 1px solid #D5D6D7;
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
      transition: .1s;
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
