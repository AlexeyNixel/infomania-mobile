<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useFilterStore } from '@/stores/filterStore';
import { storeToRefs } from 'pinia';
import { useDepartmentStore } from '@/stores/departmentStore';
import type { DepartmentType } from '@/models/baseModels';

const filterStore = useFilterStore();
const departmentStore = useDepartmentStore();

const departments = ref<DepartmentType[]>();
const { departmentFilter } = storeToRefs(filterStore);

const choseDepartment = (val: string) => {
  departmentFilter.value = val;
};

onMounted(async () => {
  departments.value = await departmentStore.getDepartments();
});

</script>

<template>
  <div class='sort'>
    <div class='sort-header'>
      <div class='sort__name'>Отдел</div>
    </div>
    <div class='sort__container'>
      <div
        class='sort__item'
        v-for='item in departments'
        :key='item.id'
        @click='choseDepartment(item.slug)'
      >
        <div class='sort__content'>
          <div class='sort__title'>{{ item.title }}</div>
          <font-awesome-icon v-if='item.slug === departmentFilter' class='sort__icon' :icon="['fas', 'check']" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.sort {
  position: absolute;
  background-color: var(--element-bg-color);
  width: 100%;
  min-height: 10vh;
  bottom: 0;
  left: 0;
  padding: 10px;
  border-radius: var(--border-radius-size) var(--border-radius-size) 0 0;

  &__name {
    text-align: center;
    font-weight: bold;
    font-size: 1.3rem;

  }

  &__container {
    display: flex;
    flex-direction: column;
  }

  &__item {

    width: 100%;
    margin: 0px 0 !important;

    &:active {
      //background: #0d4cd3;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;

  }

  &__title {
    padding: 20px;
  }

  &__icon {
    background: #007BFF;
    //font-size: 30px;
    border-radius: 10px;
    padding: 10px;

  }
}
</style>