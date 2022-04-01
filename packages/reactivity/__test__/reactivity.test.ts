import { describe, expect, it } from 'vitest'
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

  it('an object called with reactive muti should return the sanme proxy', () => {
    const target = {
      foo: 'foo',
    }
    const proxy = reactive(target)
    const proxy2 = reactive(target)

    expect(proxy).toBe(proxy2)
  })

  it('reactive calle with normal variable should be return undefined', () => {
    // @ts-expect-error ignore
    const proxy1 = reactive(0)
    // @ts-expect-error ignore
    const proxy2 = reactive('foo')
    // @ts-expect-error ignore
    const proxy3 = reactive(false)
    expect(proxy1).toBeUndefined()
    expect(proxy2).toBeUndefined()
    expect(proxy3).toBeUndefined()
  })
})
