<template lang="pug">
header(role="banner")
  nav
    router-link(to="/" exact) Detlef Schneider
    router-link(to="/about") About
    router-link(to="/contact") Contact
</template>

<script>
export default {
  name: 'header'
}
</script>

<style lang="stylus">
@import "../variables"
header
  position sticky
  top 0
  background-color rgba(white, .95)
  z-index 1
  nav
    margin 0 auto
    height 64px
    padding 0 1rem
    align-items center
    //justify-content center
    display flex
    div
      display flex
      align-items center
    a
      font-size 14px
      margin 0 1rem
      color lightness(black, 46%)
      border-bottom 1px solid transparent
      transition all 150ms ease-in
      &:first-child
        display inline-block
        margin-left 0
        svg
          display inline-block
      // &:last-child
      //   margin-left auto
      //   height 24px
      //   display inline-block
      //   padding-right 0
      &.router-link-active
        color $blue
        border-bottom 1px solid $blue
@media (max-width: 720px)
  header nav
    padding-left 16px
    padding-right 16px
    height 56px
</style>
