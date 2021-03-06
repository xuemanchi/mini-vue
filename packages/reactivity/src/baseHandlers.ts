
import { track, trigger } from './effect'
import type { Target } from './reactive'
import { ReactiveFlags } from './reactive'

const get = createGetter()
const readonlyGet = createGetter(true)
const set = createSetter()

function createGetter(isReadonly = false) {
  return function(t: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE)
      return true
    const r = Reflect.get(t, key, receiver)
    if (!isReadonly)
      track(t, 'get', key)
    return r
  }
}

function createSetter() {
  return function(t: Target, key: string | symbol, val: unknown, receiver: object) {
    const oldVal = t[key]
    const r = Reflect.set(t, key, val, receiver)
    if (oldVal !== val)
      trigger(t, 'set', key)

    return r
  }
}

export const mutableHandlers = {
  get,
  set,
}

export const readonlyHandlers = {
  get: readonlyGet,
  set() {
    console.warn('Cannot Set operation on readonly target')
    return true
  },
}
