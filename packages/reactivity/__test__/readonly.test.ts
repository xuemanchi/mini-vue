import { describe, expect, it } from 'vitest'
import { readonly } from '../src/readonly'

describe('readonly', () => {
  it('should return a readonly proxy', () => {
    const target = { foo: 1 }
    const proxy = readonly(target)
    expect(proxy.foo).toBe(1)
    proxy.foo = 2
    expect(proxy.foo).toBe(1)
  })
})
