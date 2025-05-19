export const debounce = (delay = 500, fn: Function): (() => void) => {
  let timer: ReturnType<typeof setTimeout>
  return function (...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
