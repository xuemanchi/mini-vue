import type { Target } from './reactive'
export let activeEffect: ReactiveEffect<any> | null = null

class ReactiveEffect <T> {
  public active = true
  public deps: Set<ReactiveEffect<T>>[] = []
  constructor(public fn: () => T) {

  }

  run() {
    try {
      activeEffect = this
      return this.fn()
    }
    finally {
      activeEffect = null
    }
  }
}

export function effect<T>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  if (_effect.active)
    _effect.run()
}
const targetMap = new WeakMap<Target, Map<string|symbol, Set<ReactiveEffect<any>>>>()
export function track(target: Target, type: string, key: string | symbol) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap)
    targetMap.set(target, (depsMap = new Map()))

  let dep = depsMap.get(key)
  if (!dep)
    depsMap.set(key, (dep = new Set()))

  if (!dep.has(activeEffect!)) {
    dep.add(activeEffect!)
    activeEffect!.deps.push(dep)
  }
}

export function trigger(target: Target, type: string, key: string | symbol) {
  const depsMap = targetMap.get(target)
  if (!depsMap)
    return
  const dep = depsMap.get(key)
  if (!dep)
    return
  dep.forEach((effect) => {
    if (effect.active)
      effect.run()
  })
}
