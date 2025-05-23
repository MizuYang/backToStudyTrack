<script lang="ts" setup>
const { gsap } = useGsap()

onMounted(async () => {
  await nextTick()
  gsap.to('.box', { x: 500 })
})
</script>

<template>
  <div class="m-5">
    <div class="box inline-block h-[100px] px-5 bg-purple-300 leading-[100px]">
      <code>gsap.to('.box', { x: 500 })</code>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
