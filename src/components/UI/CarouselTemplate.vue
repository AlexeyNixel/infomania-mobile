<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElSlider } from 'element-plus';

type PropsType = {
  id: string;
};

const props = defineProps<PropsType>();

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
  const target = document.querySelector(`.${props.id}`)!;
  console.log(target);
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
});
</script>

<template>
  <el-carousel
    arrow="never"
    ref="slider"
    :interval="6000"
    height="250px"
    indicator-position="none"
    :class="props.id"
  >
    <slot />
  </el-carousel>
</template>

<style scoped lang="scss"></style>
