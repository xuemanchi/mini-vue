import { describe, expect, fn, it } from 'vitest'
import { effect, reactive } from '../src/index'

describe('effect', () => {
  it('effect called normally', () => {
    const _fn = fn()
    const _effect = effect(_fn)

    expect(_fn).toBeCalledTimes(1)
  })

  it('effect called normally', () => {
    const state = reactive({
      foo: 'foo',
    })
    let val
    effect(() => {
      val = state.foo
    })
    expect(val).toBe('foo')
    state.foo = 'foofoo'
    expect(val).toMatchInlineSnapshot('"foofoo"')
    expect(val).toBe('foofoo')
  })
})
