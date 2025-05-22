<script lang="ts" setup>
const { articles } = useArticle()
</script>

<template>
  <div>
    <Articles v-model:articles="articles" />
  </div>
</template>

<style lang="scss" scoped></style>
