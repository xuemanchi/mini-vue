import { assign } from '@vue/shared'
import type { Target } from './reactive'
// eslint-disable-next-line import/no-mutable-exports
export let activeEffect: ReactiveEffect<any> | null = null

export class ReactiveEffect <T = any> {
  public parent: ReactiveEffect | null = null
  public active = true
  public deps: Set<ReactiveEffect<T>>[] = []
  constructor(public fn: () => T, public scheduler?: () => void) {

  }

  run() {
    try {
      this.parent = activeEffect
      activeEffect = this
      cleanup(this)
      return this.fn()
    }
    finally {
      activeEffect = this.parent
    }
  }
}
function cleanup(effect: ReactiveEffect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++)
      deps[i].delete(effect)
  }
  effect.deps.length = 0
}

export interface EffectOpts {
  scheduler?: (...args: any) => void
}

export function effect<T>(fn: () => T, opts: EffectOpts = {}) {
  const _effect = new ReactiveEffect(fn, opts?.scheduler)
  assign(_effect, opts)
  if (_effect.active)
    _effect.run()
}
const targetMap = new WeakMap<Target, Map<string|symbol, Set<ReactiveEffect<any>>>>()
export function trackEffect(dep: Set<ReactiveEffect>) {
  if (!dep.has(activeEffect!)) {
    dep.add(activeEffect!)
    activeEffect!.deps.push(dep)
  }
}
export function track(target: Target, type: string, key: string | symbol) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap)
    targetMap.set(target, (depsMap = new Map()))

  let dep = depsMap.get(key)
  if (!dep)
    depsMap.set(key, (dep = new Set()))
  trackEffect(dep)
}

export function triggerEffect(dep: Set<ReactiveEffect>) {
  dep = new Set(dep)
  dep && dep.forEach((effect) => {
    if (effect !== activeEffect) {
      if (effect.scheduler)
        effect.scheduler()
      else
        effect.run()
    }
  })
}
export function trigger(target: Target, type: string, key: string | symbol) {
  const depsMap = targetMap.get(target)
  if (!depsMap)
    return
  const effects = depsMap.get(key)
  if (!effects)
    return
  triggerEffect(effects)
}
