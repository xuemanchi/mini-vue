import { readonlyHandlers } from './baseHandlers'

export function readonly(target) {
  const proxy = new Proxy(target, readonlyHandlers)
  return proxy
}
