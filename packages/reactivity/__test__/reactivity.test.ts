import { assert, describe, expect, it } from 'vitest'
import { reactive } from '../src/reactive'

describe('reactive', () => {
  it('basic', () => {
    const proxy = reactive({
      foo: 1,
    })
    expect(proxy.foo).toBe(1)
  })
  it('called with get property', () => {
    const target = {
      foo: 'foo',
      get bar() {
        return this.foo
      },
      get baz() {
        return this
      },
    }
    const proxy = reactive(target)
    expect(proxy.bar).toBe('foo')
    expect(proxy.baz).not.toBe(target)
    expect(proxy.baz).toBe(proxy)
  })
})
