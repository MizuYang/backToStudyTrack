<script lang="ts" setup>
const { article } = useArticle()
</script>

<template>
  <div>
    <component :is="article?.component" />
  </div>
</template>

<style lang="scss" scoped></style>
