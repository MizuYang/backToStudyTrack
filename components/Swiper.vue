<script setup lang="ts">
import type { SwiperOptions } from 'swiper/types'
import { useSwiper } from '#imports'

const navigation = defineModel<SwiperOptions['navigation']>('navigation', {
  default: false
})
const pagination = defineModel<SwiperOptions['pagination']>('pagination', {
  default: {
    clickable: true,

    renderBullet: (index: number, className: string): string => {
      return `<span class="${className} bullet-${index}"></span>`
    }
  }
})
const loop = defineModel<SwiperOptions['loop']>('loop', { default: true })
const breakpoints = defineModel<SwiperOptions['breakpoints']>('breakpoints', {
  default: () => ({})
})
const autoplay = defineModel<SwiperOptions['autoplay']>('autoplay', {
  default: () => ({
    delay: 5000,
    disableOnInteraction: false
  })
})
const allowTouchMove = defineModel<SwiperOptions['allowTouchMove']>(
  'allowTouchMove',
  {
    default: true
  }
)

const swiperRef = ref(null)
const swiper = useSwiper(swiperRef)

const goToPrev = (): void => swiper.prev()
const goToNext = (): void => swiper.next()

// 修改 swiper pagination 的樣式
onMounted(() => {
  const style = document.createElement('style')
  style.innerHTML = `
    swiper-container::part(bullet) {
      width: 11px;
      height: 11px;
      opacity: 0.6;
      background-color: #fff;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
      transition: background-color 0.1s ease,
        opacity 0.1s ease;
      }
      
      swiper-container::part(bullet-active) {
        width: 36px;
        height: 11px;
        opacity: 1;
        background-color: #fff;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }
  ;
  `
  document.head.appendChild(style)
})

defineExpose({
  goToPrev,
  goToNext
})
</script>

<template>
  <swiper-container
    ref="swiperRef"
    v-bind="{
      ...(navigation ? { navigation: true } : {}),
      ...(pagination ? { pagination } : {}),
      breakpoints,
      loop,
      autoplay,
      allowTouchMove,
    }"
  >
    <slot />
  </swiper-container>

  <!-- <button @click="goToPrev">Prev</button>
  <button @click="goToNext">Next</button> -->
</template>

<style lang="scss">
swiper-container::part(container) {
  padding-bottom: 30px;
}
</style>
