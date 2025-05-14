<script lang="ts" setup>
import type { Articles } from '~/types'

const articles = ref<Articles[]>([
  {
    title: '照著 nuxt-swiper 官方文檔做研究',
    notionCardId: '2025-0506-2210',
    notionPath: 'Swiper_-1ebdcd513c4b80f380d0ecccabdd8906'
  }
])
</script>

<template>
  <div>
    <Breadcrumb />
    <Articles
      v-model:articles="articles"
      :base-router-path="'/plugins/nuxt-swiper'"
    />
  </div>
</template>

<style lang="scss" scoped></style>
