<script lang="ts" setup>
const { isFullScreen } = useFullPage()
</script>

<template>
  <div>
    <Header />
    <slot />

    <div id="fullScreen" :class="{ '!absolute top-0 w-full': isFullScreen }" />
  </div>
</template>

<style lang="scss" scoped></style>
