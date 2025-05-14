<script lang="ts" setup>
const route = useRoute()

const breadcrumbs = ref<string[]>(route.fullPath.split('/').slice(1))
</script>

<template>
  <nav>
    <ul class="flex">
      <li v-for="(item, idx) in breadcrumbs" :key="item">
        <span class="mx-2">/</span>
        <nuxt-link
          :to="`/${breadcrumbs.slice(0, idx + 1).join('/')}`"
          class="breadcrumb-link"
        >
          {{ item }}
          <template v-if="idx === breadcrumbs.length - 1">
            <span>(目前位置)</span>
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
</style>
