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
