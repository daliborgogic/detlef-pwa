<template lang="pug">
#app(ref="app")
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

  mounted () {
    // https://w3c.github.io/pointerevents/
    window.addEventListener('pointerdown', e => {
      switch (e.pointerType) {
      case 'mouse':
        // mouse detected
        this.$refs.app.className += ' mouse'
        break
      case 'touch':
        // touch detected
        this.$refs.app.className += ' mouse'
        break
      default:
        // pointerType unknown or cannot be detected
      }
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

img
  vertical-align middle
  &:after
    content attr(alt)
    position absolute
    z-index 2
    top 0
    left 0
    width 100%
    height 100%
    background-color #f2f2f2


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
h3
  font-weight 300

.view
  max-width 720px
  padding 0 1rem
  margin 1rem auto 0 auto
  position relative

.fade-enter-active
.fade-leave-active
  transition all 250ms ease-in

.fade-enter
.fade-leave-active
  opacity 0
</style>
