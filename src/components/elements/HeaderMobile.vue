<script setup lang='ts'>
import { ref, watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const darkMode = useDark();
const toggleDark = useToggle(darkMode);

const isFilter = ref<boolean>(false);

const handleDarkMode = () => toggleDark();
const handleRouteSearch = () => router.push({ name: 'search' });

const links = [
  { icon: ['fas', 'magnifying-glass'], event: handleRouteSearch },
  { icon: ['fas', 'map-location-dot'] },
  { icon: ['fas', 'clock'] },
  { icon: ['fas', 'wheelchair-move'] },
  { icon: ['fas', 'sun'], style: 'sun', event: handleDarkMode },
];

watch(route, () => {
  isFilter.value = route.name === 'search';
});
</script>

<template>
  <header class='header'>
    <router-link to='/' class='header__link'>
      <img src='/images/logo.png' alt='' />
    </router-link>
    <div class='header__btn-group'>
      <el-button
        link
        class='header__btn'
        :class='link?.style'
        v-for='(link, index) in links'
        :key='index'
        @click='link?.event'
      >
        <font-awesome-icon
          class='header__icon'
          :class='link?.style'
          :icon='link.icon'
        />
      </el-button>
    </div>
  </header>

</template>

<style scoped lang='scss'>
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
