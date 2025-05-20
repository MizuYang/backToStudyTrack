<script lang="ts" setup>
const isFullScreen = defineModel('use-full-screen', {
  type: Boolean,
  default: false
})

const title = computed(() =>
  isFullScreen.value ? '離開全螢幕' : '開啟全螢幕'
)

const fullScreenToggle = (): void => {
  isFullScreen.value = !isFullScreen.value
}
</script>

<template>
  <div class="fixed bottom-[10%] right-[100px] z-10">
    <a
      href="javascript:;"
      class="rounded-xl text-white"
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
