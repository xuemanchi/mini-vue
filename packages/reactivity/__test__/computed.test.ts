import { describe, expect, fn, it } from 'vitest'
import { computed, effect, reactive } from '../src/index'

describe('computed', () => {
  it('normal', () => {
    const state = reactive({
      foo: 'foo',
      bar: 'bar',
    })
    let result
    const computedFn = fn(() => {
      return `${state.foo}.${state.bar}`
    })
    const r = computed(computedFn)
    const _fn = fn(() => {
      result = `${r.value}effect`
    })
    effect(_fn)
    effect(_fn)
    expect(computedFn).toBeCalledTimes(1)
    expect(result).toBe('foo.bareffect')
    state.foo = 'foofoo'
    expect(computedFn).toBeCalledTimes(2)
    expect(result).toBe('foofoo.bareffect')
  })
})
