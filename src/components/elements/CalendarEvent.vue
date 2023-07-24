<script setup lang="ts">
import {ref} from "vue";

const calendar = ref()
</script>

<template>
  <el-calendar v-model="calendar" />
</template>

<style scoped lang="scss">
:deep(.el-calendar-day) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 50px;
  width: 100%;
}
</style>