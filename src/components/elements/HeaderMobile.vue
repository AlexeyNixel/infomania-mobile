<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import WorkTime from '@/components/modalWindows/WorkTime.vue';
import LibraryOnMap from '@/components/modalWindows/LibraryOnMap.vue';

const route = useRoute();
const router = useRouter();
const darkMode = useDark();
const globalStore = useGlobalStore();
const toggleDark = useToggle(darkMode);

const { isWorkTime } = storeToRefs(globalStore);
const { isLibraryOnMap } = storeToRefs(globalStore);

const isFilter = ref<boolean>(false);

const handleDarkMode = () => toggleDark();
const handleRouteSearch = () => router.push({ name: 'search' });

const links = [
  { icon: ['fas', 'magnifying-glass'], event: handleRouteSearch },
  {
    icon: ['fas', 'map-location-dot'],
    event: () => (isLibraryOnMap.value = !isLibraryOnMap.value),
  },
  {
    icon: ['fas', 'clock'],
    event: () => (isWorkTime.value = !isWorkTime.value),
  },
  {
    icon: ['fas', 'wheelchair-move'],

    event: () =>
      router.push({
        name: 'entry',
        params: { slug: 'dostupnaya-sreda-03-32-22-10-22' },
      }),
  },
  {
    icon: ['fas', 'graduation-cap'],
    event: () => router.push({ name: 'information' }),
  },
  { icon: ['fas', 'sun'], style: 'sun', event: handleDarkMode },
];

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
  <work-time />
  <library-on-map />
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1vh 0;

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
    flex-wrap: wrap;
  }

  &__btn {
    font-size: 1.4rem;
    margin: 0;
  }

  &__icon {
    color: #007bff;
    font-size: 1.4rem;
  }
}

.el-button + .el-button {
  margin: 0;
}

.sun {
  color: orange;
}
</style>
