<script setup lang="ts">
import { useSliderStore } from '@/stores/sliderStore';
import { onMounted, ref } from 'vue';
import type { SliderType } from '@/models/baseModels';
import CarouselTemplate from '@/components/UI/CarouselTemplate.vue';

const sliderStore = useSliderStore();
const slides = ref<SliderType[]>();
const staticUrl = import.meta.env.VITE_STATIC_URL;

onMounted(async () => {
  slides.value = await sliderStore.getSlides({ include: 'image,entry' });
});
</script>

<template>
  <carousel-template id="slider" height="34vw">
    <el-carousel-item v-for="item in slides" :key="item" class="slider__item">
      <router-link :to="{ name: 'entry', params: { slug: item.entry.slug } }">
        <img :src="staticUrl + item.image.path" alt="" class="slider__img" />
      </router-link>
    </el-carousel-item>
  </carousel-template>
</template>

<style scoped lang="scss">
.slider {
  margin: 1vw 0;
  border-radius: var(--border-radius-size);

  &__img {
    width: 100%;
    height: 100%;
  }
}
</style>
