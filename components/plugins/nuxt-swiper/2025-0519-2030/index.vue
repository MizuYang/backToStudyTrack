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
const isLoading = ref(false)

onMounted(() => {
  isLoading.value = true
})
</script>

<template>
  <section>
    <template v-if="isLoading">
      <ClientOnly>
        <Swiper
          :autoplay="false"
          :use-custom-pagination-arrow="{ enabled: true }"
          :breakpoints="breakpoints"
        >
          <swiper-slide v-for="i in 9" :key="i" :data-hash="`slide-${i}`">
            <div
              class="h-[100px] w-[100px] bg-red-300/50 text-center leading-[100px]"
            >
              {{ i }}測試內容
            </div>
          </swiper-slide>
        </Swiper>
      </ClientOnly>
    </template>
    <template v-else>
      <div v-for="i in 9" :key="i" class="opacity-0">
        {{ i }}測試內容
      </div>
    </template>
  </section>
</template>

<style lang="scss" scoped>
// 修改 Swiper 的箭頭樣式
// :deep(.custom-swiper-arrow.left),
// :deep(.custom-swiper-arrow.right) {
// border: 2px solid red !important;
// }
</style>
