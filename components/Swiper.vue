<script setup lang="ts">
import type { SwiperOptions } from 'swiper/types'
import type { CustomPaginationArrow } from '~/types/swiper'
import { useSwiper } from '#imports'

const navigation = defineModel<SwiperOptions['navigation']>('navigation', {
  default: false
})
const pagination = defineModel<SwiperOptions['pagination']>('pagination', {
  default: {
    /**
     * 若使用 useCustomPaginationArrow，clickable 必須為 false, 否則點擊 pagination 切換輪播的 index 會是錯誤的
     * 因為目前做法是將客製化的箭頭按鈕直接塞在 pagination 裡面
     * swiper 運作時就會將箭頭按鈕的索引也考慮進去，造成點擊 pagination 時，會切換到錯誤的 index
     * 但若不將箭頭放在 pagination 中，在不同斷點時，修改絕對定位上會有很大的成本
     */
    clickable: false,

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

const arrowTo = (direction: 'prev' | 'next'): void => {
  if (swiper && typeof swiper.activeIndex.value === 'number') {
    let idx =
      direction === 'prev'
        ? swiper.activeIndex.value - 1
        : swiper.activeIndex.value + 1
    if (idx < 0) {
      // 如果 idx 小於 0，則回到最後一個
      idx = swiper.slides.value.length - 1
    } else if (idx >= swiper.slides.value.length) {
      // 如果 idx 超過最後一個，則回到第一個
      idx = 0
    }
    swiper.to(idx)
  }
}
const customPaginationArrow = (): void => {
  if (useCustomPaginationArrow.value?.enabled) {
    // 插入自訂箭頭到 pagination
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

    // 建立左箭頭
    const leftBtn = document.createElement('button')
    leftBtn.className = 'custom-swiper-arrow left'
    leftBtn.setAttribute('part', 'custom-pagination-arrow-left')
    leftBtn.style.backgroundImage = `url("${useCustomPaginationArrow.value?.leftArrow?.iconUrl || '/icons/arrow-left.svg'}")`
    leftBtn.onclick = (): void => arrowTo('prev')

    // 建立右箭頭
    const rightBtn = document.createElement('button')
    rightBtn.className = 'custom-swiper-arrow right'
    rightBtn.setAttribute('part', 'custom-pagination-arrow-right')
    rightBtn.style.backgroundImage = `url("${useCustomPaginationArrow.value?.rightArrow?.iconUrl || '/icons/arrow-right.svg'}")`
    rightBtn.onclick = (): void => arrowTo('next')

    // 插入到 pagination
    paginationEl.prepend(leftBtn)
    paginationEl.appendChild(rightBtn)
  }
}
const bindCustomPaginationClick = (): void => {
  const container = document.querySelector('swiper-container')
  const paginationEl = container?.shadowRoot?.querySelector(
    '[part="pagination"]'
  )
  if (!paginationEl) {
    return
  }

  paginationEl.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('swiper-pagination-bullet')) {
      const idx = Number(target.dataset.index)
      swiper.to(idx)
    }
  })
}

onMounted(() => {
  customPaginationArrow()
  bindCustomPaginationClick()
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
::part(custom-pagination-arrow-left),
::part(custom-pagination-arrow-right) {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
}
</style>
