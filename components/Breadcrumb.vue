<script lang="ts" setup>
const route = useRoute()

const breadcrumbs = ref<string[]>(route.fullPath.split('/').slice(1))
const { article } = useArticle()

watchEffect(() => {
  breadcrumbs.value = route.fullPath.split('/').slice(1)
})
</script>

<template>
  <nav>
    <ul class="flex">
      <li>
        <nuxt-link to="/" class="breadcrumb-link">
          首頁
        </nuxt-link>
      </li>
      <li v-for="(item, idx) in breadcrumbs" :key="item">
        <span class="mx-2">/</span>
        <nuxt-link
          :to="`/${breadcrumbs.slice(0, idx + 1).join('/')}`"
          class="breadcrumb-link"
          :class="{ 'font-normal': idx === breadcrumbs.length - 1 }"
        >
          {{ item }}
          <template v-if="idx === breadcrumbs.length - 1">
            {{ article?.title ? `-${article?.title}` : "" }}
          </template>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.breadcrumb-link {
  @apply inline-block font-bold text-blue-500 transition-transform duration-100 hover:scale-[1.02];
}
.font-normal {
  @apply cursor-default text-gray-700 hover:scale-[1];
}
</style>
