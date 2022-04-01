import { isObject } from '@vue/shared'

const reactiveMap = new WeakMap()
export function reactive<T extends object>(target: T) {
  if (!isObject(target))
    // 开发环境提示错误
    return

  const isExisted = reactiveMap.get(target)
  if (isExisted)
    return isExisted

  const proxy = new Proxy(target, {
    get(t, key, receive) {
      const r = Reflect.get(t, key, receive)
      return r
    },
    set(t, key, val, receive) {
      const r = Reflect.set(t, key, val, receive)
      return r
    },
  })
  reactiveMap.set(target, proxy)
  return proxy
}
