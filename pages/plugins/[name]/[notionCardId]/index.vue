<script lang="ts" setup>
const route = useRoute()

const { getArticles } = useArticle()
const { articles } = getArticles()

const targetArticle = articles.filter(
  (article: any) => article.notionCardId === route.params.notionCardId
)[0]

const getComponents = (): void => {
  articles.forEach((item: any): void => {
    console.log(item.notionCardId)
    item.component = shallowRef(defineAsyncComponent(
      () =>
        import(
          `../../../../components/plugins/nuxt-swiper/${item.notionCardId}/index.vue`
        )
    ))
  })
}

getComponents()

</script>

<template>
  <div>
    <Breadcrumb />
    <component :is="targetArticle.component" />
  </div>
</template>

<style lang="scss" scoped></style>
