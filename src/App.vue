<template lang="pug">
#app
  app-header
  main
    transition(name="fade" mode="out-in")
      router-view.view
  snack-bar
</template>

<script>
const DOMAIN = 'http://localhost:5000'

import SnackBar from '@/components/SnackBar.vue'
import AppHeader from '@/components/Header.vue'

export default {
  components: {
    SnackBar,
    AppHeader
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


    })
  }
}
</script>

<style lang="stylus">
@import "./variables"
@font-face
  font-family: 'main'
  src url('~/public/fonts/main.woff') format('woff')
  src url('~/public/fonts/main.ttf') format('truetype')

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
  font-size 1.4375rem
  line-height 1.30435
  letter-spacing .2px
  color black
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
  color black
  text-decoration none
  &:active
  &:hover
    outline-width 0
  &:focus
  &:hover
    color black
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
  max-width 720px
  padding 0 1rem
  margin 1rem auto 0 auto
  position relative

.fade-enter-active
.fade-leave-active
  transition all 250ms ease

.fade-enter
.fade-leave-active
  opacity 0
</style>
