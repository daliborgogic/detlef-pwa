<template lang="pug">
header(role="banner")
  nav
    router-link(to="/" exact) #[span(@click="filter('all')") Detlef Schneider]
    div
      router-link(to="/") #[span(@click="filter('film')") Film]
      router-link(to="/") #[span(@click="filter('fashion')") Fashion]
      router-link(to="/") #[span(@click="filter('advertising')") Advertising]
      router-link(to="/") #[span(@click="filter('sports')") Sports]
      router-link(to="/about") About
      router-link(to="/contact") Contact
</template>

<script>
export default {
  name: 'header',

  methods: {
    filter: function(name) {
     this.$store.dispatch('filter', name)
    }
  }
}
</script>

<style lang="stylus">
@import "../variables"
header
  position sticky
  top 0
  background-color white
  z-index 1
  //border-bottom 1px solid tomato
  nav
    margin 0 auto
    height 64px
    padding 0 1rem
    align-items center
    //justify-content center
    display flex
    > a
      text-transform uppercase
      letter-spacing .25px
      font-size 28px
    div
      margin-left auto
      a
        font-size 1.4375rem
        color rgb(17,17,17)
        &:last-child:after
          width 0
      a
      button
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
    nav
      display none
      padding-left 16px
      padding-right 16px
      height 56px
</style>
