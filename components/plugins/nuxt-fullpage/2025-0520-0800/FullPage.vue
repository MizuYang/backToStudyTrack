<script lang="ts" setup>
const options = {
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
  menu: '#menu',
  anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
  sectionsColor: ['#41b883', '#ff5f45', '#0798ec', 'yellow', 'purple']
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
