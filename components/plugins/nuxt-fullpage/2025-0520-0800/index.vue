<script lang="ts" setup>
import FullPage from './FullPage.vue'
import FullScreenToggleBtn from './FullScreenToggleBtn.vue'

const isFullScreen = ref(false)
</script>

<template>
  <div>
    <template v-if="isFullScreen">
      <teleport to="#fullScreen">
        <FullPage />
      </teleport>
    </template>

    <template v-else>
      <FullPage />
    </template>

    <FullScreenToggleBtn v-model:use-full-screen="isFullScreen" />
  </div>
</template>

<style lang="scss" scoped></style>
