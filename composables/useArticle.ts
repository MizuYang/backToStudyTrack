import { articles } from '@/articles'

console.log('articles: ', articles)

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
  const data = ref(articles)

  const getArticles = (): any => {
    const [lv1, lv2] = route.fullPath.split('/').slice(1)
    return { articles: data.value?.[lv1]?.[lv2] || [] }
  }

  return {
    articles,
    getArticles
  }
}
