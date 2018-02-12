export const debouce = (fn, timeout = 100) => {
  let next = undefined

  return (...args) => {
    if (next) window.clearTimeout(next)

    next = window.setTimeout(() => {
      next = undefined
      fn(...args)
    }, timeout)
  }
}
