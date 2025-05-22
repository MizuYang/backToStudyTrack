<script lang="ts" setup>
import { menuList } from '~/menuList/lv1Menu'

const route = useRoute()
const lv1Name = route.fullPath.split('/').at(1)
</script>

<template>
  <div>
    <MainMenu v-model:menu="menuList[lv1Name as keyof typeof menuList]" />
  </div>
</template>

<style lang="scss" scoped></style>
