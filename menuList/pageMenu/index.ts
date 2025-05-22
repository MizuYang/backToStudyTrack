import { articles } from '@/articles'
import type { MenuList } from '@/types'

const pagesMenuList: MenuList[] = [
  {
    name: '套件',
    description: '',
    path: 'plugins',
    imgUrl:
      'https://images.unsplash.com/reserve/oIpwxeeSPy1cnwYpqJ1w_Dufer%20Collateral%20test.jpg?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=7200'
  },
  {
    name: 'UI 框架',
    description: '',
    path: 'uiFrameworks',
    imgUrl:
      'https://www.notion.so/images/page-cover/met_camille_pissarro_1896.jpg'
  },
  {
    name: '手刻元件 或 實現某個功能',
    description: '看到某個網站有很酷的功能，想自己嘗試看看，例：黑暗模式',
    path: 'customComponents',
    imgUrl:
      'https://thumbs.dreamstime.com/b/%E5%A0%86%E7%A7%AF%E6%9C%A8%E5%9D%97%E7%9A%84%E4%BA%BA%E7%9A%84%E6%89%8B-%E4%B8%9A%E5%8A%A1%E5%8F%91%E5%B1%95%E6%A6%82%E5%BF%B5-146848311.jpg'
  },
  {
    name: '切版',
    description: 'HTML, CSS, SASS, RWD',
    path: 'htmlCss',
    imgUrl: 'https://divbyte.com/wp-content/uploads/2019/02/html-css.png',
    pagesLength: 1
  }
]

const getMenuArticleLength = (): void => {
  pagesMenuList.forEach((menu) => {
    let length = 0
    const lv1Articles = articles[menu?.path as keyof typeof articles]
    if (lv1Articles) {
      Object.values(lv1Articles).forEach((article): void => {
        length += article.length
      })
    }
    menu.pagesLength = length
  })
}

getMenuArticleLength()

export { pagesMenuList }
