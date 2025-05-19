<script lang="ts" setup>
const breakpoints = ref({
  640: {
    slidesPerView: 1,
    spaceBetween: 10
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20
  },
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
      <swiper-slide v-for="i in 9" :key="i">
        <div class="text-center">
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
//   border: 2px solid red !important;
// }
</style>
