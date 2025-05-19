<script lang="ts" setup>
import type { SwiperOptions } from 'swiper/types'
const breakpoints = ref<Record<number, SwiperOptions>>({
  // 640: {
  //   slidesPerView: 1,
  //   spaceBetween: 10
  // },
  // 768: {
  //   slidesPerView: 2,
  //   spaceBetween: 20
  // },
  1024: {
    slidesPerView: 3,
    spaceBetween: 30
  }
})
</script>

<template>
  <section>
    <Swiper
      :autoplay="false"
      :use-custom-pagination-arrow="{ enabled: true }"
      :breakpoints="breakpoints"
    >
      <swiper-slide
        v-for="i in 9"
        :key="i"
        :data-hash="`slide-${i}`"
      >
        <div
          class="h-[100px] w-[100px] bg-red-300/50 text-center leading-[100px]"
        >
          {{ i }}
        </div>
      </swiper-slide>
    </Swiper>
  </section>
</template>

<style lang="scss" scoped>
// 修改 Swiper 的箭頭樣式
// :deep(.custom-swiper-arrow.left),
// :deep(.custom-swiper-arrow.right) {
// border: 2px solid red !important;
// }
</style>
