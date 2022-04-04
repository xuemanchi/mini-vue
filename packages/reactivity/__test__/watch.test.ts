import { describe, expect, fn, it } from 'vitest'
import { effect, reactive, watch } from '../src/index'

describe('watch', () => {
  it('normal', () => {
    const state = reactive({
      foo: 'foo',
      bar: 'bar',
    })
    let r
    watch(state, (newVal) => {
      r = newVal.foo
    })
    expect(r).toBeUndefined()
    state.foo = 'foofoo'
    expect(r).toBe('foofoo')
  })
})
