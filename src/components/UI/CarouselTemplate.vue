<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElSlider } from 'element-plus';

type PropsType = {
  id: string;
  height: string;
};

const props = defineProps<PropsType>();

const slider = ref(ElSlider);
const timer = ref();

const startSwipe = ref<number>(0);
const endSwipe = ref<number>(0);

const handleSwipeSlides = () => {
  if (startSwipe.value - endSwipe.value > 12) {
    slider.value.next();
  }
  if (startSwipe.value - endSwipe.value < -12) {
    slider.value.prev();
  }
};

onMounted(async () => {
  const target = document.querySelector(`.${props.id}`)!;
  target.addEventListener('touchstart', (e: any) => {
    startSwipe.value = e.touches[0].clientX;
  });

  target.addEventListener('touchmove', (e: any) => {
    if (timer.value) return;
    timer.value = setTimeout(() => {
      endSwipe.value = e.touches[0].clientX;
      handleSwipeSlides();
    }, 300);
  });
  target.addEventListener('touchend', () => {
    timer.value = null;
  });
});
</script>

<template>
  <el-carousel
    arrow="never"
    ref="slider"
    :interval="6000"
    :height="height"
    indicator-position="none"
    :class="props.id"
  >
    <slot />
  </el-carousel>
</template>

<style scoped lang="scss"></style>
