<script lang="ts" setup>
const { article } = useArticle()
</script>

<template>
  <div>
    <Breadcrumb />
    <component :is="article?.component" />
  </div>
</template>

<style lang="scss" scoped></style>
