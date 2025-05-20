<script lang='ts' setup>
const options = {
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
  menu: '#menu',
  anchors: ['page1', 'page2', 'page3'],
  sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
}
</script>

<template>
  <div>
    <full-page id="fullpage" ref="fullpage" :options="options">
      <div class="section">
        First section ...
      </div>
      <div class="section">
        Second section ...
      </div>
    </full-page>
  </div>
</template>

<style lang='scss' scoped></style>
