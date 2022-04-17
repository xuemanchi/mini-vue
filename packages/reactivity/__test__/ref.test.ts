import { describe, expect, it } from 'vitest'
import { ref } from '../src/index'
import { isReactive } from '../src/reactive'

describe('ref', () => {
  it('should return a ref', () => {
    const targetRef = ref(1)
    expect(targetRef.value).toBe(1)
  })
  it('should work with target is object', () => {
    const targetRef = ref({ foo: 1 })
    expect(targetRef.value.foo).toBe(1)
    expect(isReactive(targetRef.value)).toBe(true)
  })
})
