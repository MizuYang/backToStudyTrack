<script lang="ts" setup>
const pluginsMenu = ref([
  {
    name: 'nuxt-swiper',
    description: '',
    path: 'plugins/nuxt-swiper',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShL5GI211jz4GULYm9j4tzGDUV15z3bSm2rQ&s',
    pagesLength: 1
  },
  {
    name: 'nuxt-fullPage',
    description: '',
    path: 'plugins/nuxt-fullPage',
    imgUrl:
      'https://blog.yuyansoftware.com.tw/wp-content/uploads/2019/09/fullpage_js.png',
    pagesLength: 1
  },
  {
    name: 'gsap',
    description: '',
    path: 'plugins/gsap',
    imgUrl:
      'https://camo.githubusercontent.com/45c274df310cde42b2aaaa1b9f34e5e205b854b9c05a4ad4a2cab6ce37d83110/68747470733a2f2f677361702e636f6d2f475341502d73686172652d696d6167652e706e67',
    pagesLength: 1
  }
])
</script>

<template>
  <div>
    <Breadcrumb />
    <MainMenu v-model:menu="pluginsMenu" />
  </div>
</template>

<style lang="scss" scoped></style>
