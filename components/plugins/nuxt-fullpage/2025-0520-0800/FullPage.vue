<script lang="ts" setup>
const options = {
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
  menu: '#menu',
  anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
  sectionsColor: ['#41b883', '#ff5f45', '#0798ec', 'yellow', 'purple'],
  scrollingSpeed: 700, // 滾動速度
  loopTop: true, // 是否循環滾動到頂部
  loopBottom: true, // 是否循環滾動到底部
  keyboardScrolling: true, // 是否啟用鍵盤滾動
  recordHistory: true, // 是否記錄歷史, 通過瀏覽器的前進後退來導航
  navigation: true, // 是否顯示導航
  navigationTooltips: ['page1', 'page2', 'page3', 'page4', 'page5'], // 導航的提示
  showActiveTooltip: true, // 是否顯示當前頁面的提示
  slidesNavigation: true, // 是否顯示橫向的導航
  slidesNavPosition: 'bottom' // 橫向導航的位置 top, bottom
  // paddingTop: '10px', // 頁面上方的內邊距
  // paddingBottom: '10px' // 頁面下方的內邊距
}
</script>

<template>
  <full-page id="fullpage" ref="fullpage" :options="options">
    <div
      v-for="idx in 5"
      :key="`page-${idx}`"
      class="section text-center text-[100px]"
    >
      {{ idx }} section ...

      <div class="slide active">
        slide 1
      </div>
      <div class="slide">
        slide 2
      </div>
      <div class="slide">
        slide 3
      </div>
      <div class="slide">
        slide 4
      </div>
    </div>
  </full-page>
</template>

<style lang="scss" scoped></style>
