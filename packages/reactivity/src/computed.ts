import { isFunction, isObject } from '@vue/shared'
import { ReactiveEffect, trackEffect, triggerEffect } from './effect'

class ComputedRefImpl<T> {
  dirty = true
  effect: ReactiveEffect
  dep = new Set<ReactiveEffect>()
  lastValue: any | undefined = undefined
  _value: T | undefined = undefined
  constructor(fnOrOpt: any) {
    let getter
    if (isFunction(fnOrOpt))
      getter = fnOrOpt

    else if (isObject(fnOrOpt))
      getter = fnOrOpt.get

    this.effect = new ReactiveEffect(getter, () => {
      // trigger logic
      if (!this.dirty) {
        this.dirty = true
        triggerEffect(this.dep)
      }
    })
  }

  get value() {
    if (this.dirty) {
      this._value = this.effect.run()
      this.dirty = false
    }
    trackEffect(this.dep)
    return this._value
  }
}
export function computed(fnOrOpt) {
  return new ComputedRefImpl(fnOrOpt)
}
