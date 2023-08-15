<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore();
const { isLibraryOnMap } = storeToRefs(globalStore);
</script>

<template>
  <div>
    <el-dialog v-model="isLibraryOnMap" title="Библиотека на карте">
      <iframe
        class="map"
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A952a94a4b33a6930b5ce54184df44d9a8f630cc4697ed47374222011683b6ded&amp;source=constructor"
        width="100%"
        height="700"
      />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.map {
  width: 70vw;
  height: 45vh;
}
:deep(.el-dialog) {
  width: 80%;
  height: 50%;
}

:deep(.el-dialog__body) {
  padding: 0;
}

.map {
  width: 100%;
}
</style>
