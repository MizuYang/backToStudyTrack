<script lang="ts" setup>
const { gsap } = useGsap()

const easePractice = (): void => {
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
}
const timeline1 = gsap.timeline()
const timelineT1Fn = (): void => {
  timeline1.to('.t1 .box-timeline-1', {
    x: () => window.innerWidth / 2,
    ease: 'expoScale(0.5,7,none)',
    yoyo: true,
    repeat: -1,
    duration: 2
  })
  timeline1.to('.t1 .box-timeline-2', {
    x: () => window.innerWidth / 2,
    ease: 'expoScale(0.5,7,none)',
    yoyo: true,
    repeat: -1,
    duration: 1
  })
  timeline1.to('.t1 .box-timeline-3', {
    x: () => window.innerWidth / 2,
    ease: 'expoScale(0.5,7,none)',
    yoyo: true,
    repeat: -1,
    duration: 1
  })
}
const timeline2 = gsap.timeline()
const timelineT2Fn = (): void => {
  timeline2.to('.t2 .box-timeline-1', { x: 500 })
  timeline2.to('.t2 .box-timeline-2', { x: 500 }, 1)
  timeline2.to('.t2 .box-timeline-3', { x: 500 }, '<')
  timeline2.to('.t2 .box-timeline-4', { x: 500 }, '>')
}

onMounted(async () => {
  await nextTick()

  easePractice()
  timelineT1Fn()
  timelineT2Fn()
})
</script>

<template>
  <main class="m-5 flex flex-col items-start gap-y-3 py-10">
    <section class="flex w-full flex-col items-start gap-y-3 bg-yellow-100">
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
    </section>

    <section class="area-style bg-blue-200/20">
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
    </section>

    <section class="t1 area-style bg-red-200/20">
      <div class="box box-timeline-1">
        gsap.timeline()
      </div>
      <div class="box box-timeline-2">
        gsap.timeline()
      </div>
      <div class="box box-timeline-3">
        gsap.timeline()
      </div>
    </section>

    <section class="t2 area-style bg-amber-200/20">
      <button
        type="button"
        class="bg-blue-400 px-2 py-1 text-white"
        @click="timeline2.restart()"
      >
        重新執行時間軸
      </button>
      <div class="box box-timeline-1">
        1 直接執行,
        <code class="ml-5 bg-black/80 px-2 py-1 text-white"> { x: 500 }</code>
      </div>
      <div class="box box-timeline-2">
        2 一秒後執行,
        <code class="ml-5 bg-black/80 px-2 py-1 text-white">
          { x: 500 }, 1</code>
      </div>
      <div class="box box-timeline-3">
        3 與上一個一起執行,
        <code class="ml-5 bg-black/80 px-2 py-1 text-white">
          { x: 500 }, '&lt;'</code>
      </div>
      <div class="box box-timeline-4">
        4 上一個結束後執行,
        <code class="ml-5 bg-black/80 px-2 py-1 text-white">
          { x: 500 }, '>'</code>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.box {
  @apply inline-block h-[100px] bg-gray-300 px-5 leading-[100px];
}
.area-style {
  @apply flex w-full flex-col items-start gap-2;
}
</style>
