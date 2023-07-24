<script setup lang="ts">
import { useMenuStore } from "@/stores/menuStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { MenuType } from "@/models/baseModels";

const route = useRoute()
const menuStore = useMenuStore()
const menus = ref<MenuType[]>()

onMounted(async () => {
  menus.value = await menuStore.getMenus({
    searchByField: `menuType=` + route.params.slug as string,
    include: 'menuItems',
  })
})
</script>

<template>
  <div class="menus" v-for="item in menus" :key="item.id">
    <div class="menus__title">{{ item.title }}</div>
    <div v-for="menu in item.menuItems" :key="menu.id">
      <router-link
          :to='{name:"document", params:{slug:menu.slug}}'
          class="menus__item"
          v-if="!menu.link"
      >
        {{ menu.title }}
      </router-link>
      <a :href="menu.link" class="menus__item" v-else target="_blank">
        {{ menu.title }}
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menus {
  margin: 1vw 0;

  &__title {
    color: #1d5deb;
    font-weight: bold;
    font-size: var(--title-font-size);
  }

  &__item {
    display: flex;
    flex-direction: column;
    font-size: var(--regular-font-size);
    text-decoration: none;
    color: var(--font-color);
  }
}
</style>