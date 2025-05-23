import type { UseFullPage } from '~/types/composables'

const isFullScreen = ref(false)

export const useFullPage = (): UseFullPage => {
  const fullScreenToggle = (): void => {
    isFullScreen.value = !isFullScreen.value
  }
  const openFullScreen = (): void => {
    isFullScreen.value = true
  }
  const closeFullScreen = (): void => {
    isFullScreen.value = false
  }

  onUnmounted(() => {
    closeFullScreen()
  })

  return {
    isFullScreen,
    fullScreenToggle,
    openFullScreen,
    closeFullScreen
  }
}
