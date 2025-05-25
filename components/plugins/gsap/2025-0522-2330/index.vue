<script lang="ts" setup>
const { gsap } = useGsap()

onMounted(async () => {
  await nextTick()
  gsap.to('.box-to', { x: 500 })
  gsap.from('.box-from', { x: 500 })
  gsap.fromTo('.box-fromTo', { x: 500 }, { x: 250 })
  gsap.set('.box-set', { x: 150 })
})
</script>

<template>
  <div class="m-5 flex flex-col items-start gap-y-3">
    <div class="box box-to bg-purple-200">
      <code>gsap.to('.box-to', { x: 500 })</code>
    </div>
    <div class="box box-from bg-purple-300">
      <code>gsap.from('.box-from', { x: 500 })</code>
    </div>
    <div class="box box-fromTo bg-purple-400">
      <code>gsap.fromTo('.box-fromTo', { x: 500 }, { x: 250 })</code>
    </div>
    <div class="box box-set bg-purple-500">
      <code> gsap.set('.box-set', { x: 150 })</code>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  @apply inline-block h-[100px] px-5 leading-[100px];
}
</style>
