<script lang="ts" setup>
import { pluginMenuList } from '@/menuList'

console.log('pluginMenuList: ', pluginMenuList)
</script>

<template>
  <div>
    <Breadcrumb />
    <MainMenu v-model:menu="pluginMenuList" />
  </div>
</template>

<style lang="scss" scoped></style>
