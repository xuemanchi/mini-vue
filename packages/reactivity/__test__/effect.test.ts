import { describe, expect, fn, it } from 'vitest'
import { effect, reactive } from '../src/index'

describe('effect', () => {
  it('effect called normally', () => {
    const _fn = fn()
    effect(_fn)

    expect(_fn).toBeCalledTimes(1)
  })

  it('reactive data change, effect fn will called again', () => {
    const state = reactive({
      foo: 'foo',
    })
    let val
    effect(() => {
      val = state.foo
    })
    expect(val).toBe('foo')
    state.foo = 'foofoo'
    expect(val).toBe('foofoo')
  })

  it('reactive data no change, effect fn will not called', () => {
    const state = reactive({
      foo: 'foo',
    })
    const _fn = fn(() => state.foo)
    effect(_fn)
    expect(_fn).toBeCalledTimes(1)
    state.foo = 'foo'
    expect(_fn).toBeCalledTimes(1)
  })
  it('should avoid implicit infinite recursive loops with itself', () => {
    const state = reactive({
      foo: 'foo',
    })
    const _fn = fn(() => {
      state.foo = Math.random()
      return state.foo
    })
    effect(_fn)
    expect(_fn).toBeCalledTimes(1)
    state.foo = 'foofoo'
    expect(_fn).toBeCalledTimes(2)
  })

  it('should avoid extra effect called', () => {
    const state = reactive({
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
    })
    const _fn = fn(() => {
      state.foo ? state.bar : state.baz
    })
    effect(_fn)
    expect(_fn).toBeCalledTimes(1)
    state.foo = ''
    expect(_fn).toBeCalledTimes(2)
    state.bar = 'barbar'
    expect(_fn).toBeCalledTimes(2)
  })

  it('should custom schedule', () => {
    const state = reactive({
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
    })
    const _fn = fn(() => {
      state.foo ? state.bar : state.baz
    })
    const customSchefuler = fn(() => {})
    effect(_fn, {
      scheduler() {
        customSchefuler()
      },
    })
    expect(_fn).toBeCalledTimes(1)
    expect(customSchefuler).toBeCalledTimes(0)
    state.foo = ''
    expect(_fn).toBeCalledTimes(1)
    expect(customSchefuler).toBeCalledTimes(1)
  })
})
