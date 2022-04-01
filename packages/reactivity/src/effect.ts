class ReactiveEffect <T> {
  constructor(public fn: () => T) {

  }

  run() {
    this.fn()
  }
}

export function effect<T>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}
