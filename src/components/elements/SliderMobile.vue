<script setup lang="ts">
import {useSliderStore} from "@/stores/sliderStore";
import {onMounted, ref} from "vue";
import type {SliderType} from "@/models/baseModels";

const sliderStore = useSliderStore()
const slides = ref<SliderType[]>()
const staticUrl = import.meta.env.VITE_STATIC_URL

onMounted(async () =>{
  slides.value = await sliderStore.getSlides({include: 'image'})
})
</script>

<template>
  <el-carousel height="150px" indicator-position='none' class="slider">
    <el-carousel-item v-for="item in slides" :key="item" class="slider__item">
      <img :src="staticUrl+item.image.path" alt="" class="slider__img">
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped lang="scss">
.slider {
  margin: 1vw 0;
  border-radius:  var(--border-radius-size);
  &__img {
    width: 100%;
    height: 100%;
  }

}
</style>