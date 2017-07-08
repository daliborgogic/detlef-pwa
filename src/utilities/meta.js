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
      //console.log('META ', meta)
      if(meta.title) {
        this.$ssrContext.title = meta.title || 'Detlef Schneider'
      } else {
        this.$ssrContext.title = 'Detlef Schneider'
      }
      this.$ssrContext.description = meta.description || 'Detlef Schneider is a German born photographer whose work is predominantly focused on sport and fashion.'
      this.$ssrContext.card = meta.card
    }
  }
}

const clientMetaMixin = {
  mounted () {
    const meta = getMeta(this)
    if (meta) {
      document.title = `${meta.title + ' | Detlef Schneider'}`
    } else {
      document.title = `Detlef Schneider`
    }
  }
}

export default process.env.VUE_ENV === 'server' ? serverMetaMixin : clientMetaMixin
