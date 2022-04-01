export function reactive(target) {
  const proxy = new Proxy(target, {
    get(t, key, receive) {
      const r = Reflect.get(t, key, receive)
      return r
    },
    set(t, key, val, receive) {
      const r = Reflect.set(t, key, val, receive)
      return r
    },
  })

  return proxy
}
