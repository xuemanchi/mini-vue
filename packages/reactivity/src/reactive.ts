import { isObject } from '@vue/shared'

export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw',
}

const reactiveMap = new WeakMap()
export function reactive<T extends object>(target: T) {
  if (!isObject(target))
    // 开发环境提示错误
    return

  if (target[ReactiveFlags.IS_REACTIVE])
    return target

  const isExisted = reactiveMap.get(target)
  if (isExisted)
    return isExisted

  const proxy = new Proxy(target, {
    get(t, key, receive) {
      if (key === ReactiveFlags.IS_REACTIVE)
        return true

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
