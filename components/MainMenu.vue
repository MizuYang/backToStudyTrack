<script lang="ts" setup>
import type { MenuList } from '@/types'

const menu = defineModel<MenuList[]>('menu', { required: true })
</script>

<template>
  <ul class="menu-wrap">
    <li
      v-for="item in menu"
      :key="item?.name"
      class="rounded-lg bg-gray-500 shadow-xl"
    >
      <nuxt-link :to="item?.path" class="inline-block h-full w-full">
        <img :src="item?.imgUrl" class="cover-img" :alt="item?.name">
        <span class="menu-title">
          <span class="text-lg font-black">{{ item?.name }} ({{ item?.pagesLength }}筆)</span>
          <br>
          {{ item?.description }}
        </span>
      </nuxt-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.menu-wrap {
  @apply mx-auto grid max-w-[1200px] grid-cols-3 gap-12 pt-[100px];
}
.cover-img {
  @apply h-[250px] w-full rounded-t-lg object-cover;
}
.menu-title {
  @apply inline-block w-full rounded-b-lg bg-gray-500 px-4 py-2 text-white;
}
</style>
