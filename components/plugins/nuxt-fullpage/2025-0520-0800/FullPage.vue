<script lang="ts" setup>
const options = {
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
  menu: '#menu',
  anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
  sectionsColor: ['#41b883', '#ff5f45', '#0798ec', 'yellow', 'purple'],
  scrollingSpeed: 700, // 滾動速度
  loopTop: true, // 是否循環滾動到頂部
  loopBottom: true // 是否循環滾動到底部
}
</script>

<template>
  <full-page id="fullpage" ref="fullpage" :options="options">
    <div v-for="idx in 5" :key="`page-${idx}`" class="section">
      {{ idx }} section ...
    </div>
  </full-page>
</template>

<style lang="scss" scoped></style>
