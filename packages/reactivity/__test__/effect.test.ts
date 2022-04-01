import { assert, describe, expect, fn, it } from 'vitest'
import { effect } from '../src/index'

describe('effect', () => {
  it('effect called normally', () => {
    const _fn = fn()
    const _effect = effect(_fn)

    expect(_fn).toBeCalledTimes(1)
  })
})
