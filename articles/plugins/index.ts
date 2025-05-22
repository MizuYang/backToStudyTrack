import { nuxtSwiperArticles } from './nuxt-swiper'
import { nuxtFullPageArticles } from './nuxt-fullpage'
import { gsapArticles } from './gsap'

export const plugins = {
  'nuxt-swiper': nuxtSwiperArticles,
  'nuxt-fullPage': nuxtFullPageArticles,
  gsap: gsapArticles
}
