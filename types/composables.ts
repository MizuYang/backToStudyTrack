export interface UseFullPage {
  isFullScreen: Ref<boolean>;
  fullScreenToggle: () => void;
  openFullScreen: () => void;
  closeFullScreen: () => void;
}
