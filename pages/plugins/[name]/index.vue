<script lang="ts" setup>
const { getArticles } = useArticle()
const { articles } = getArticles()
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
