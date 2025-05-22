<script lang="ts" setup>
import { pluginMenuList } from '~/menuList/lv1Menu'

console.log('pluginMenuList: ', pluginMenuList)
</script>

<template>
  <div>
    <MainMenu v-model:menu="pluginMenuList" />
  </div>
</template>

<style lang="scss" scoped></style>
