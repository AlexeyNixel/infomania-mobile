<template>
  <el-scrollbar class="nav-menu">
    <div class="nav-menu__content">
      <p class="nav-menu__item" v-for="item in menus" :key="item">
        {{ item }}
      </p>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menus = ref(['Читателям', 'О библиотеке', 'Коллегам', 'Документы']);
</script>

<style scoped lang="scss">
.nav-menu {
  margin: 1vw 0;

  &__content {
    display: flex;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 100px;
    height: 80px;
    margin-right: 10px;
    border-radius: 20px;
    color: white;
    font-size: 0.8rem;

    &:nth-child(1) {
      background: #f44242;
    }

    &:nth-child(2) {
      background: #6ea917;
    }

    &:nth-child(3) {
      background: #ff6600;
    }

    &:nth-child(4) {
      background: #4285f4;
    }
  }
}
</style>
