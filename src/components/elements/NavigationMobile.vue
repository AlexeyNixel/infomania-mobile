<script setup lang="ts">
const menus = [
  {
    title: 'Читателям',
    slug: 'COMMON',
  },
  {
    title: 'О библиотеке',
    slug: 'ABOUT',
  },
  {
    title: 'Коллегам',
    slug: 'COLLEAGUES',
  },
  {
    title: 'Документы',
    slug: 'DOCUMENTS',
  },
];
</script>

<template>
  <el-scrollbar class="nav-menu">
    <div class="nav-menu__content">
      <router-link
        :to="{ name: 'menus', params: { slug: item.slug } }"
        class="nav-menu__item"
        v-for="item in menus"
        :key="item.slug"
      >
        {{ item.title }}
      </router-link>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.nav-menu {
  margin: 1vh 0;

  &__content {
    display: flex;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 110px;
    height: 50px;
    padding: 5px;
    margin-right: 10px;
    border-radius: var(--border-radius-size);
    color: white;
    font-size: var(--regular-font-size);
    text-decoration: none;
    font-weight: bold;

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

:deep(.el-scrollbar__bar.is-horizontal) {
  display: none;
}
</style>
