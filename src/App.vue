<template lang="pug">
#app
  app-header
  main
    transition(name="fade" mode="out-in")
      router-view.view
  app-footer
  snack-bar
</template>

<script>
const DOMAIN = 'http://localhost:5000'

import SnackBar from '@/components/SnackBar.vue'
import AppHeader from '@/components/Header.vue'
import AppFooter from '@/components/Footer.vue'

export default {
  components: {
    SnackBar,
    AppHeader,
    AppFooter
  },

  mounted() {
    window.addEventListener('online', () =>
      this.$store.dispatch('snackbar', { id: 0, show: false })
    )

    window.addEventListener('offline', () =>
      this.$store.dispatch('snackbar', { id: 0, show: true })
    )

    window.addEventListener('load', () => {
      window.addEventListener('online', () =>
        this.$store.dispatch('snackbar', { id: 0, show: false })
      )
      this.$store.dispatch('snackbar', {
        id: 0,
        show: navigator.onLine ? false : navigator.onLine
      })

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(`${DOMAIN}/service-worker.js`).then(reg => {
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
                      this.$store.dispatch('snackbar', {
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

        navigator.serviceWorker.ready.then(registration => {
          registration.sync.register('outbox').then(() => {
            // registration succeeded
            console.log('registration succeeded')
          }, () => {
            // registration failed
            console.log('registration failed')
          })
        })

      }
    })
  }
}
</script>

<style lang="stylus">
@import "./variables"

html
  font-family sans-serif
  line-height 1.15
  -ms-text-size-adjust 100%
  -webkit-text-size-adjust 100%
  -webkit-box-sizing border-box
  box-sizing border-box
  -ms-overflow-style scrollbar
  -webkit-tap-highlight-color transparent

*
*::before
*::after
  -webkit-box-sizing inherit
  box-sizing inherit

@-ms-viewport
  width device-width

html
body
  height 100%

#app
  display flex
  flex-direction column
  min-height 100%

[v-cloak]
  display none

main
  flex 1

body
  margin 0
  font-family $sansSerif
  font-weight normal
  font-size 1rem
  line-height 1.5
  color $umbra
  background-color white
  overflow-y scroll
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-rendering optimizeLegibility

p
  margin-top 0
  margin-bottom 1rem

[tabindex="-1"]:focus
  outline none !important

a
  background-color transparent
  -webkit-text-decoration-skip objects
  color $brandColor
  text-decoration none
  &:active
  &:hover
    outline-width 0
  &:focus
  &:hover
    color #212121
    text-decoration none
  &:not([href]):not([tabindex])
    color inherit
    text-decoration none
  &:not([href]):not([tabindex]):focus
  &:not([href]):not([tabindex]):hover
    color inherit
    text-decoration none
  &:not([href]):not([tabindex]):focus
    outline 0

// ToDo
*:focus
  outline none

[role="button"]
  cursor pointer
a
[role="button"]
  -ms-touch-action manipulation
  touch-action manipulation

.view
  max-width 600px
  padding 0 1rem
  margin 30vh auto 0 auto
  position relative

.fade-enter-active
.fade-leave-active
  transition all 250ms ease

.fade-enter
.fade-leave-active
  opacity 0
</style>
