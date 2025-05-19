import { articles as allArticles } from '@/articles'

console.log('allArticles: ', allArticles)

// interface Article {
//   title: string;
//   notionCardId: string;
//   notionPath: string;
// }
// interface ArticleList {
//   [key: string]: {
//     [key: string]: Article[];
//   };

export const useArticle = (): any => {
  // }
  const route = useRoute()
  const articles = ref<any>({})
  const article = ref<any>({})
  const [lv1, lv2, lv3] = route.fullPath.split('/').slice(1)

  // 用 glob 匹配所有三層資料夾下的 index.vue
  const modules = import.meta.glob('@/components/*/*/*/index.vue')

  const getArticles = (): any => {
    articles.value = allArticles?.[lv1]?.[lv2] || []
    article.value = articles.value.filter(
      (item: any) => item.notionCardId === route.params.notionCardId
    )[0]
  }

  const getCurrentDynamicComponent = (): void => {
    if (!article.value || !article.value.notionCardId) {
      article.value.component = null
      return
    }
    // 找到對應的元件路徑
    const matchedPath = Object.keys(modules).find(path =>
      path.includes(`/${article.value.notionCardId}/index.vue`)
    )
    if (matchedPath) {
      article.value.component = shallowRef(
        defineAsyncComponent(modules[matchedPath] as () => Promise<any>)
      )
    } else {
      article.value.component = null
    }
  }

  const init = (): void => {
    getArticles()
    if (lv3) { getCurrentDynamicComponent() }
  }

  init()

  return {
    article,
    articles,
    getArticles,
    getCurrentDynamicComponent
  }
}
