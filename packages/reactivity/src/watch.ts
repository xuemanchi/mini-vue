import { isArray, isObject } from '@vue/shared'
import { ReactiveEffect } from './effect'

function traverse(val: any) {
  if (!isObject(val))
    return val

  for (const key in val) {
    if (Object.prototype.hasOwnProperty.call(val, key))
      traverse(val[key])
  }
  return val
}

export function watch(objOrFn, cb: (newVal: any, oldVal: any | undefined) => void) {
  let getter
  if (isObject(objOrFn)) {
    getter = () => {
      return traverse(objOrFn)
    }
  }
  let oldVal
  const effect = new ReactiveEffect(getter, () => {
    const newVal = effect.run()
    cb(newVal, oldVal)
    oldVal = newVal
  })
  effect.run()
}
