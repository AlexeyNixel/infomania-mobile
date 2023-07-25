<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ref, watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/globalStore';

const route = useRoute();
const router = useRouter();
const darkMode = useDark();
const toggleDark = useToggle(darkMode);

const globalStore = useGlobalStore();

const search = ref<string>();
const isFilter = ref<boolean>(false);

const date = ref<string>();

const handleDarkMode = () => toggleDark();
const links = [
  { icon: ['fas', 'map-location-dot'] },
  { icon: ['fas', 'clock'] },
  { icon: ['fas', 'wheelchair-move'] },
  { icon: ['fas', 'sun'], style: 'sun', event: handleDarkMode },
];

const handleSearch = () => {
  router.push({ name: 'search', query: { search: search.value } });
};
const handleOpenFilters = () => {
  if (!globalStore.isFiltersWindow) {
    globalStore.isFiltersWindow = !globalStore.isFiltersWindow;
    console.log(globalStore.isFiltersWindow);
  }
};

watch(route, () => {
  isFilter.value = route.name === 'search';
});
</script>

<template>
  <header class="header">
    <router-link to="/" class="header__link">
      <img src="/images/logo.png" alt="" />
    </router-link>
    <div class="header__btn-group">
      <el-button
        link
        class="header__btn"
        :class="link?.style"
        v-for="(link, index) in links"
        :key="index"
        @click="link?.event"
      >
        <font-awesome-icon
          class="header__icon"
          :class="link?.style"
          :icon="link.icon"
        />
      </el-button>
    </div>
  </header>
  <div class="search">
    <el-input
      clearable
      v-model="search"
      class="search__input"
      size="large"
      placeholder="Поиск по сайту"
      :prefix-icon="Search"
      @keyup.enter="handleSearch"
    >
      <template #append v-if="route.name === 'search'">
        <el-button link @click="handleOpenFilters">
          <font-awesome-icon class="search__filter" :icon="['fas', 'filter']" />
        </el-button>
      </template>
    </el-input>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__link {
    width: 50%;
    font-size: 3rem;
    font-weight: bold;

    img {
      width: 40vw;
    }
  }

  &__btn-group {
    width: 50%;
    display: flex;
    justify-content: space-between;
  }

  &__btn {
    font-size: 1.4rem;
  }

  &__icon {
    color: #007bff;
  }
}

.sun {
  color: orange;
}
</style>
