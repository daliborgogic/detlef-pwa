<template lang="pug">
header(role="banner" @mouseover="headerOver" @mouseleave="headerLeave")
  nav(ref="nav" v-bind:class="[navVisible ? 'true' : 'false']")
    div
      router-link.mh(to="/" exact) Detlef Schneider
    div
      router-link(to="/film") Film
      router-link(to="/fashion") Fashion
      router-link(to="/advertising") Advertising
      router-link(to="/sport")  Sports
      router-link(to="/about") About
      router-link(to="/contact") Contact
</template>

<script>
export default {
  name: 'header',

  data () {
    return {
      navVisible: true
    }
  },

  mounted () {
    setTimeout(() => this.navVisible = false, 5000)
  },

  methods: {
    headerOver () { this.navVisible = true },
    headerLeave () { this.navVisible = false }
  }
}
</script>

<style lang="stylus">
@import "../variables"
.false
  transform translateY(-100px)
.true
  transform translateY(0)
header
  position fixed
  width 100%
  top 0
  background-color white
  z-index 10
  //border-bottom 1px solid tomato
  nav
    margin 0 auto
    height 64px
    padding 0 1rem
    align-items center
    display flex
    transition all 500ms ease-out
    div:first-child
      order 1
      a
        text-transform uppercase
        letter-spacing .25px
        font-size 28px
    div:last-child
      order 2
      margin-left auto
      a
        font-size 1.4375rem
        color rgb(17,17,17)
        &:last-child:after
          width 0
        &:after
          margin 0 .5rem
          vertical-align middle
          content ""
          width 20px
          height 2px
          background-color black
          display inline-block
@media (max-width: 720px)
  header
    top auto
    bottom 0
    nav
      padding-left 16px
      padding-right 16px
      height auto
      flex-direction column
      div:first-child
        height 56px
        line-height 56px
        order 2
      div:last-child
        margin-left 0
        order 1
        a:after
          margin 0
          width 0
          height 0
          background-color transparent
      a
      span
        width 100%
        display block
        text-align center
      span
        font-size 18px
      // div
      //   display none
</style>
