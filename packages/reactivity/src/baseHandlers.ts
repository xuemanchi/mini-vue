
import { track, trigger, activeEffect } from './effect'
import type { Target } from './reactive'
import { ReactiveFlags } from './reactive'

export const mutableHandlers = {
  get(t: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE)
      return true

    const r = Reflect.get(t, key, receiver)
    if (activeEffect) {
      track(t, 'get', key)
    }
    return r
  },
  set(t: Target, key: string | symbol, val: unknown, receiver: object) {
    const r = Reflect.set(t, key, val, receiver)
    trigger(t, 'set', key)
    return r
  },
}
