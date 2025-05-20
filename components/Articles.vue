<script lang="ts" setup>
import type { Article } from '~/types'

const route = useRoute()

const articles = defineModel<Article[]>('articles', { required: true })

const notionBaseUrl = 'https://www.notion.so/'
</script>

<template>
  <ul class="articles">
    <li
      v-for="(article, idx) in articles"
      :key="`article-${article?.notionCardId}`"
      class="mb-3 flex items-center"
    >
      <article class="mr-10 flex">
        <span class="mr-5 inline-block text-2xl">{{ idx + 1 }}.</span>
        <NuxtLink
          :to="`${route.fullPath}/${article?.notionCardId}`"
          class="article-link"
        >
          <span>
            {{ article?.notionCardId }} -
            {{ article?.title }}
          </span>
        </NuxtLink>
      </article>
      <a
        :href="`${notionBaseUrl}${article.notionPath}`"
        class="ml-auto shrink-0 border-2 border-indigo-400 px-2 py-1 hover:bg-blue-300/20"
        target="_blank"
      >前往筆記</a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.articles {
  @apply mx-auto max-w-[800px] pt-[100px];
}
.article-link {
  @apply inline-block text-2xl font-normal text-blue-700 hover:bg-blue-300/20;
}
</style>
