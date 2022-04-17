import { isObject } from '@vue/shared'
import { reactive } from './reactive'

class RefImpl {
  _value: any
  __v_isRef = true
  constructor(value) {
    this._value = isObject(value) ? reactive(value) : value
  }

  get value() {
    return this._value
  }

  set value(value) {
    this._value = value
  }
}

export function ref(value) {
  return new RefImpl(value)
}

export function isRef(r: any): r is RefImpl {
  return r instanceof RefImpl && r.__v_isRef
}

export function unref(ref: RefImpl) {
  return isRef(ref) ? ref.value : ref
}
