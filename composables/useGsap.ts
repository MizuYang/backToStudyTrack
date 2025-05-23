
import { gsap } from 'gsap'

import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

export const useGsap = (): { gsap: typeof gsap; Flip: typeof Flip } => {
  return {
    gsap,
    Flip
  }
}
