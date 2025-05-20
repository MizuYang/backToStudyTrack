import 'vue-fullpage.js/dist/style.css'
import VueFullPage from 'vue-fullpage.js'

export default defineNuxtPlugin((nuxtApp) => {
  // 將套件掛載上去
  nuxtApp.vueApp.use(VueFullPage)
})
