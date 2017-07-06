<template lang="pug">
.snackbar(:class="{ offline: show }")
  span {{ message }}
  button(role="button" v-if="action" @click="what") {{cta}}
</template>

<script>
export default {
  name: 'snackbar',

  data () {
    return {
      show: false,
      action: '',
      cta: ''
    }
  },

  computed: {
    message () {
      let msg = ''
      let a = this.$store.getters.message

      this.show = a.show
      this.action = ''
      switch (a.id) {
        case 0:
          msg = 'No network connection!'
          this.action = true
          this.cta = 'close'
          break
        case 1:
          msg = 'New or updated content is available.'
          this.action = true
          this.cta = 'refresh'
          // setTimeout(() => {
          //   this.show = false
          // }, 2750)
          break
        case 2:
          msg = `This site is cached ${a.size}KB. Ready to use offline!`
          setTimeout(() => {
            this.show = false
          }, 5000)
          break
        default:
          msg = null
      }
      return msg
    }
  },

  methods: {
    what () {
      if (this.cta === 'refresh') {
        window.location.reload()
      }
      this.$store.dispatch('snackbar', { id: 0, show: false })
    }
  }
}
</script>

<style lang="stylus">
@import "../variables"

.snackbar
  position fixed
  min-width 288px
  max-width 568px
  left 24px
  bottom -10rem
  font-size 14px
  color white
  min-height 48px
  border-radius 2px
  padding 1rem 24px
  box-shadow 0 3px 6px rgba(black, .16), 0 3px 6px rgba(black, .23)
  transition all 400ms ease-in
  background-color #323232
  display flex
  align-items baseline
  span
    flex 1
    color white
  &.offline
    bottom 24px
  button
    padding 0 0 0 40px
    border none
    background-color transparent
    color $yellow
    font-size 14px
    text-transform uppercase
@media (max-width: $mobile)
  .snackbar
    width 100%
    left 0
    &.offline
      bottom 0
</style>
