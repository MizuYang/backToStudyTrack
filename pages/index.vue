<script lang="ts" setup>
import { pagesMenuList } from '~/menuList/pageMenu'
</script>

<template>
  <div>
    <MainMenu v-model:menu="pagesMenuList" />
  </div>
</template>

<style lang="scss" scoped></style>
