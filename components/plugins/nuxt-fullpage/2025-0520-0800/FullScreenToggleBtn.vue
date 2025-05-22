<script lang="ts" setup>
const { isFullScreen, fullScreenToggle } = useFullPage()

const title = computed(() =>
  isFullScreen.value ? '離開全螢幕' : '開啟全螢幕'
)
</script>

<template>
  <div class="fixed bottom-[10%] right-[100px] z-10">
    <a
      href="javascript:;"
      class="rounded-xl text-white transition-all duration-300 ease-in-out"
      :class="
        isFullScreen
          ? 'bg-gray-400 p-5 hover:bg-gray-400/80 active:bg-gray-400/60'
          : 'bg-blue-400 p-5 hover:bg-blue-400/80 active:bg-blue-400/60'
      "
      @click="fullScreenToggle"
    >
      {{ title }}
    </a>
  </div>
</template>

<style lang="scss" scoped></style>
