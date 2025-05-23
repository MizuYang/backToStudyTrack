<script lang="ts" setup>
const options = {
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE', // 這是開源的授權金鑰
  menu: '#menu', // 導航的選單
  anchors: ['page1', 'page2', 'page3', 'page4', 'page5'], // 導航的錨點
  sectionsColor: ['#41b883', '#ff5f45', '#0798ec', 'yellow', 'purple'], // 每個頁面的背景顏色
  scrollingSpeed: 700, // 滾動速度

  keyboardScrolling: true, // 是否啟用鍵盤滾動
  recordHistory: true, // 是否記錄歷史, 通過瀏覽器的前進後退來導航
  navigation: true, // 是否顯示導航
  navigationTooltips: ['page1', 'page2', 'page3', 'page4', 'page5'], // 導航的提示
  showActiveTooltip: true, // 是否顯示當前頁面的提示
  slidesNavigation: true, // 是否顯示橫向的導航
  slidesNavPosition: 'bottom', // 橫向導航的位置 top, bottom
  easingcss3: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'

  /**
   * easeingcss3:
   * 可以自訂貝茲曲線: https://matthewlein.com/tools/ceaser
   * 或使用預設的漸變效果: https://www.w3schools.com/cssref/css3_pr_transition-timing-function.php
   * 例如: ease, linear, ease-in, ease-out, ease-in-out..等
   */

  // paddingTop: '10px', // 頁面上方的內邊距
  // paddingBottom: '10px' // 頁面下方的內邊距

  // autoScrolling: false, // 是否啟用自動滾動(以一個頁面高度為單位來滾動區塊)
  // fitToSection: true, // 是否自動調整到整個頁面
  // fitToSectionDelay: 600, // 自動調整到整個頁面的延遲時間

  // loop
  // continuousVertical: true, // 是否啟用垂直循環滾動
  // continuousHorizontal: true // 是否啟用橫向循環滾動
  // loopTop: true, // 是否循環滾動到頂部
  // loopBottom: true, // 是否循環滾動到底部

  /**
   * dragAndMovedragAndMove:
   * true: 啟用該功能
   * false: 禁用該功能
   * vertical: 只能在垂直情况下启用该功能。
     horizontal: 只能在水平情况下启用该功能。
     fingersonly: 仅启用触摸设备的功能。
     mouseonly: 仅启用桌面设备的功能（鼠标和触控板）。
   */
  // dragAndMovedragAndMove: true, // 是否啟用拖曳滾動
  // verticalCentered: true, // 是否啟用垂直置中
  // responsiveWidth: 1200, // 當視窗寬度小於這個像素時，會自動關閉自動滾動

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
