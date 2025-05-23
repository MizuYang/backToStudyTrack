<script lang="ts" setup>
const { gsap } = useGsap()

onMounted(async () => {
  await nextTick()
  gsap.to('.box-to', { x: 500 })
})
</script>

<template>
  <div class="m-5 flex flex-col items-start">
    <div
      class="box-to inline-block h-[100px] bg-purple-200 px-5 leading-[100px]"
    >
      <code>gsap.to('.box-to', { x: 500 })</code>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
