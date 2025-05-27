<script lang="ts" setup>
const { gsap } = useGsap()

onMounted(async () => {
  await nextTick()
  gsap.to('.box-to', { x: 500 })
  gsap.from('.box-from', { x: 500 })
  gsap.fromTo('.box-fromTo', { x: 500 }, { x: 250 })
  gsap.set('.box-set', { x: 150 })
  gsap.to('.box-ease', {
    x: '50vw',
    duration: 2.5,
    ease: 'elastic.out(1,0.3)'
  })
  gsap.to('.box-staggers', {
    x: () => window.innerWidth / 2,
    xPercent: 100,
    duration: 2,
    stagger: 0.3,
    ease: 'elastic.out(1,0.3)',
    yoyo: true,
    repeat: -1
  })

  const timeline1 = gsap.timeline()
  timeline1.to('.box-timeline-1', {
    x: () => window.innerWidth / 2,
    ease: 'expoScale(0.5,7,none)',
    yoyo: true,
    repeat: -1,
    duration: 2
  })
  timeline1.to('.box-timeline-2', {
    x: () => window.innerWidth / 2,
    ease: 'expoScale(0.5,7,none)',
    yoyo: true,
    repeat: -1,
    duration: 1
  })
  timeline1.to('.box-timeline-3', {
    x: () => window.innerWidth / 2,
    ease: 'expoScale(0.5,7,none)',
    yoyo: true,
    repeat: -1,
    duration: 1
  })
})
</script>

<template>
  <div class="m-5 flex flex-col items-start gap-y-3">
    <div class="box box-to">
      <code>gsap.to('.box-to', { x: 500 })</code>
    </div>
    <div class="box box-from">
      <code>gsap.from('.box-from', { x: 500 })</code>
    </div>
    <div class="box box-fromTo">
      <code>gsap.fromTo('.box-fromTo', { x: 500 }, { x: 250 })</code>
    </div>
    <div class="box box-set">
      <code>gsap.set('.box-set', { x: 150 })</code>
    </div>
    <div class="box box-ease">
      <code>ease: 'elastic.out(1,0.3)'</code>
    </div>

    <div class="bg-blue-200/20 area-style">
      <div class="box box-staggers">
        stagger
      </div>
      <div class="box box-staggers">
        stagger
      </div>
      <div class="box box-staggers">
        stagger
      </div>
      <div class="box box-staggers">
        stagger
      </div>
    </div>

    <div class="bg-red-200/20 area-style">
      <div class="box box-timeline-1">
        gsap.timeline()
      </div>
      <div class="box box-timeline-2">
        gsap.timeline()
      </div>
      <div class="box box-timeline-3">
        gsap.timeline()
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  @apply inline-block h-[100px] bg-gray-300 px-5 leading-[100px];
}
.area-style {
  @apply w-full flex flex-col items-start gap-2;
}
</style>
