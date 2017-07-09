import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(`${process.env.DOMAIN}/service-worker.js`).then(reg => {
      reg.onupdatefound = () => {
        const installingWorker = reg.installing
        installingWorker.onstatechange = () => {
          switch (installingWorker.state) {
            case 'installed':
              // Note that any opaque (i.e. cross-domain, without CORS) responses in the cache will return a size of 0.
              caches.keys().then(cache => {
                let total = 0
                return Promise.all(
                  cache.map(cache => {
                    // Change this to match the cache name filter you want.
                    if (!cache.includes('mnml')) {
                      return
                    }

                    return caches.open(cache).then(c => {
                      return c.keys().then(keys => {
                        return Promise.all(
                          keys.map(key => {
                            return c.match(key)
                              .then(res => res.arrayBuffer())
                              .then(buffer => total += buffer.byteLength)
                          })
                        )
                      })
                    })
                  })
                ).then(() => {
                  console.log(`Total bytes: ${total}`)
                  store.dispatch('snackbar', {
                    id: navigator.serviceWorker.controller === null ? 2 : 1,
                    show: true,
                    size: navigator.serviceWorker.controller === null ? 0 : (total / 1024).toFixed()
                  })
                })
              })
              break
            case 'waiting':
              // This is an update to a previous service worker, and it's now waiting.
              break
            case 'redundant':
              // Something went wrong and the service worked couldn't install.
              console.error('The installing service worker became redundant.')
              break
            default:
              // Ignore
          }
        }
      }
    }).catch(e => {
      console.error(`Error during service worker registration:', ${e}`)
    })
  }

  // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  )

  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date

  // Trace debugging
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging
  // window.ga_debug = {trace: true}

  ga('create', 'UA-NNNNNN-N', 'auto')

  if (isLocalhost) {
    ga('set', 'sendHitTask', null)
  }

  router.afterEach((to, from) => {
        window.addEventListener('online', () =>
    store.dispatch('snackbar', { id: 0, show: false })
    )

    window.addEventListener('offline', () =>
      store.dispatch('snackbar', { id: 0, show: true })
    )

    window.addEventListener('load', () => {
      window.addEventListener('online', () =>
        store.dispatch('snackbar', { id: 0, show: false })
      )
      store.dispatch('snackbar', {
        id: 0,
        show: navigator.onLine ? false : navigator.onLine
      })


    })
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })

  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})
