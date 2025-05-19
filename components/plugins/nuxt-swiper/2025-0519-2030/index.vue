<script lang="ts" setup></script>

<template>
  <section>
    <Swiper :autoplay="false" :use-custom-pagination-arrow="{ enabled: true }">
      <swiper-slide v-for="i in 10" :key="i">
        <p class="text-center">
          {{ i }}
        </p>
      </swiper-slide>
    </Swiper>
  </section>
</template>

<style lang="scss" scoped></style>
