<script setup lang="ts">
import { useSliderStore } from '@/stores/sliderStore';
import { onMounted, ref } from 'vue';
import type { SliderType } from '@/models/baseModels';
import { ElSlider } from 'element-plus';

const sliderStore = useSliderStore();
const slides = ref<SliderType[]>();
const staticUrl = import.meta.env.VITE_STATIC_URL;

const slider = ref(ElSlider);
const timer = ref();

const startSwipe = ref<number>(0);
const endSwipe = ref<number>(0);

const handleSwipeSlides = () => {
  const direction = startSwipe.value - endSwipe.value > 0 ? 'left' : 'right';
  if (direction === 'left') {
    slider.value.next();
  } else {
    slider.value.prev();
  }
};

onMounted(async () => {
  const target = document.querySelector('.slider')!;
  target.addEventListener('touchstart', (e: any) => {
    startSwipe.value = e.touches[0].clientX;
  });

  target.addEventListener('touchmove', (e: any) => {
    if (timer.value) return;
    timer.value = setTimeout(() => {
      timer.value = null;
      endSwipe.value = e.touches[0].clientX;
      handleSwipeSlides();
    }, 300);
  });

  slides.value = await sliderStore.getSlides({ include: 'image,entry' });
});
</script>

<template>
  <el-carousel
    arrow="never"
    ref="slider"
    :interval="6000"
    height="150px"
    indicator-position="none"
    class="slider"
  >
    <el-carousel-item v-for="item in slides" :key="item" class="slider__item">
      <router-link :to="{ name: 'entry', params: { slug: item.entry.slug } }">
        <img :src="staticUrl + item.image.path" alt="" class="slider__img" />
      </router-link>
    </el-carousel-item>
  </el-carousel>
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
