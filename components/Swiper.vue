<script setup lang="ts">
import type { SwiperOptions } from 'swiper/types'
import type { CustomPaginationArrow } from '~/types/swiper'
import { useSwiper } from '#imports'
import { debounce } from '~/utils'

const navigation = defineModel<SwiperOptions['navigation']>('navigation', {
  default: false
})
const pagination = defineModel<SwiperOptions['pagination']>('pagination', {
  default: {
    clickable: true,

    renderBullet: (index: number, className: string): string => {
      return `<span class="${className} bullet-${index}" data-index="${index}"></span>`
    }
  }
})
const useCustomPaginationArrow = defineModel<CustomPaginationArrow>(
  'useCustomPaginationArrow',
  {
    default: {
      enabled: false
    }
  }
)
const loop = defineModel<SwiperOptions['loop']>('loop', { default: true })
const breakpoints = defineModel<SwiperOptions['breakpoints']>('breakpoints', {
  default: () => ({})
})
const autoplay = defineModel<SwiperOptions['autoplay']>('autoplay', {
  default: {
    delay: 500,
    disableOnInteraction: false
  }
})
const allowTouchMove = defineModel<SwiperOptions['allowTouchMove']>(
  'allowTouchMove',
  {
    default: true
  }
)
const mousewheel = defineModel<SwiperOptions['mousewheel']>('mousewheel', {
  default: {
    enabled: false,
    invert: false
  }
})
const keyboard = defineModel<SwiperOptions['keyboard']>('keyboard', {
  default: false
})
const hashNavigation = defineModel<SwiperOptions['hashNavigation']>(
  'hashNavigation',
  {
    default: false
  }
)

const swiperRef = ref(null)
const swiper = useSwiper(swiperRef)

const goToPrev = (): void => swiper.prev()
const goToNext = (): void => swiper.next()

const isClient = ref(import.meta.client)

const leftArrow = ref<HTMLButtonElement | null>(null)
const rightArrow = ref<HTMLButtonElement | null>(null)
const customPaginationArrow = (): void => {
  if (!useCustomPaginationArrow.value?.enabled) {
    return
  }

  const container = document.querySelector('swiper-container')
  if (!container) {
    return
  }
  const paginationEl = container.shadowRoot?.querySelector(
    '[part="pagination"]'
  )
  if (!paginationEl) {
    return
  }

  const paginationTop = paginationEl.getBoundingClientRect().top
  const firstBulletLeft =
    [...paginationEl.children].at(0)?.getBoundingClientRect().left ?? 0
  const lastBulletRight =
    [...paginationEl.children].at(-1)?.getBoundingClientRect().right ?? 0

  if (leftArrow.value) {
    leftArrow.value.style.backgroundImage = `url("${useCustomPaginationArrow.value?.leftArrow?.iconUrl || '/icons/arrow-left.svg'}")`
    leftArrow.value.style.top = `${paginationTop}px`
    leftArrow.value.style.left = `${firstBulletLeft - 30}px` // 30px 是箭頭的寬度
  }

  if (rightArrow.value) {
    rightArrow.value.style.backgroundImage = `url("${useCustomPaginationArrow.value?.rightArrow?.iconUrl || '/icons/arrow-right.svg'}")`
    rightArrow.value.style.top = `${paginationTop}px`
    rightArrow.value.style.left = `${lastBulletRight + 10}px` // 10px 是箭頭和最後一個圓點的間距
  }
}
const debouncedCustomPaginationArrow = debounce(100, customPaginationArrow)

onMounted(() => {
  customPaginationArrow()
  if (isClient.value) {
    window?.addEventListener('resize', debouncedCustomPaginationArrow)
  }
})
onUnmounted(() => {
  if (isClient.value) {
    window?.removeEventListener('resize', debouncedCustomPaginationArrow)
  }
})
</script>

<template>
  <div>
    <swiper-container
      ref="swiperRef"
      v-bind="{
        ...(navigation ? { navigation: true } : {}),
        ...(pagination ? { pagination } : {}),
        breakpoints,
        loop,
        autoplay,
        allowTouchMove,
        mousewheel,
        keyboard,
        hashNavigation,
      }"
    >
      <slot />
    </swiper-container>

    <template v-if="useCustomPaginationArrow?.enabled">
      <button
        ref="leftArrow"
        type="button"
        class="custom-swiper-arrow left"
        @click="goToPrev"
      />
      <button
        ref="rightArrow"
        type="button"
        class="custom-swiper-arrow right"
        @click="goToNext"
      />
    </template>
  </div>
</template>

<style lang="scss">
::part(container) {
  padding-bottom: 30px;
}

// pagination
::part(pagination) {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
}
::part(bullet) {
  width: 11px;
  height: 11px;
  opacity: 0.6;
  background-color: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  transition:
    width 0.5s ease,
    background-color 0.3s ease,
    opacity 0.3s ease;
  cursor: pointer;
  margin: 0;
}
::part(bullet-active) {
  width: 36px;
  height: 11px;
  opacity: 1;
  background-color: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  transition:
    width 0.5s ease,
    background-color 0.3s ease,
    opacity 0.3s ease;
  cursor: pointer;
  margin: 0;
  margin: 0;
}

// pagination arrows
.custom-swiper-arrow.left,
.custom-swiper-arrow.right {
  position: absolute;
  z-index: 10;
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  transform: translateY(-6px);

  /*
   * 父層修改樣式的寫法
      :deep(.custom-swiper-arrow.left),
      :deep(.custom-swiper-arrow.right) {
        border: 2px solid red !important;
      }
  */
}
</style>
