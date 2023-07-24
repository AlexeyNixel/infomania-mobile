<template>
  <header class="header">
    <router-link to="/" class="header__link">
      <img src="/images/logo.png" alt=""/>
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
        <font-awesome-icon class="header__icon" :class="link?.style" :icon="link.icon"/>
      </el-button>
    </div>
  </header>
  <div class="search">
    <el-input
        v-model="search"
        class="search__input"
        size="large"
        placeholder="Поиск по сайту"
        :prefix-icon="Search"
    />
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core'

const search = ref<string>();
const darkMode = useDark()
const toggleDark = useToggle(darkMode)
const handleDarkMode = () => toggleDark()

const links = [
  { icon: ['fas', 'map-location-dot'] },
  { icon: ['fas', 'clock'] },
  { icon: ['fas', 'wheelchair-move'] },
  { icon: ['fas', 'sun'], style: 'sun', event: handleDarkMode },
];
</script>

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
