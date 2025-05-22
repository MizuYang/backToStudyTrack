import type { UseFullPage } from '~/types/composables'

const isFullScreen = ref(false)

export const useFullPage = (): UseFullPage => {
  const fullScreenToggle = (): void => {
    isFullScreen.value = !isFullScreen.value
  }

  return {
    isFullScreen,
    fullScreenToggle
  }
}
