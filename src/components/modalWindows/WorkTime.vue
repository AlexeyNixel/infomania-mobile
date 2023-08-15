<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore();
const { isWorkTime } = storeToRefs(globalStore);
</script>

<template>
  <div>
    <el-dialog v-model="isWorkTime" title="Shipping address">
      <template #header>Режим работы библиотеки</template>
      <div class="work-time">
        <div class="work-time__title">C 1 сентября по 31 мая:</div>
        <div class="work-time__content">
          вторник – пятница с 10.00 до 20.00, <br />
          суббота – воскресенье с 10.00 до 19.00,<br />
          понедельник – выходной день.<br /><br />
        </div>
        <div class="work-time__title">C 1 июня по 31 августа:</div>
        <div class="work-time__content">
          понедельник – суббота с 10.00 до 19.00,<br />
          воскресенье – выходной день.<br />
          <br />
        </div>
        <p>Последний день месяца - технический день.</p>
        <p>Условия посещения: бесплатно. Запись по предъявлению паспорта.</p>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dialog) {
  width: 80%;
}
</style>
