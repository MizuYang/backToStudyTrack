import { plugins } from '@/articles/plugins'
import type { MenuList } from '@/types'

// 這只是模板，之後要把 plugins 的地方改掉

const customComponentsMenuList: MenuList[] = [
  {
    name: '模板',
    description: '',
    path: 'plugins/nuxt-swiper',
    imgUrl:
      'https://img.freepik.com/free-psd/document-checklist-with-helmet-occupational-safety-health-administration-3d-background-illustration_56104-2389.jpg?semt=ais_hybrid&w=740'
  }
]

const getMenuArticleLength = (): void => {
  customComponentsMenuList.forEach((menu) => {
    menu.pagesLength = plugins[menu.name as keyof typeof plugins]?.length || 0
  })
}

getMenuArticleLength()

export { customComponentsMenuList }
