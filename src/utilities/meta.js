function getMeta (vm) {
  const { meta } = vm.$options
  if (meta) {
    return typeof meta === 'function'
      ? meta.call(vm)
      : meta
  }
}

const serverMetaMixin = {
  created () {
    const meta = getMeta(this)
    if (meta) {
      this.$ssrContext.title = `Detlef Schneider ${'\u2014 ' + meta.title}`
      this.$ssrContext.description = meta.description
      this.$ssrContext.card = meta.card
    }
  }
}

const clientMetaMixin = {
  mounted () {
    const meta = getMeta(this)
    if (meta) {
      document.title = `Detlef Schneider ${'\u2014 ' + meta.title}`
    }
  }
}

export default process.env.VUE_ENV === 'server' ? serverMetaMixin : clientMetaMixin
