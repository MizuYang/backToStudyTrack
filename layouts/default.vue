<script lang="ts" setup></script>

<template>
  <div>
    <Header />
    <slot />

    <div id="fullScreen" class="!absolute top-0 w-full" />
  </div>
</template>

<style lang="scss" scoped></style>
