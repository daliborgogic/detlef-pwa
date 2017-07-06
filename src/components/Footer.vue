<template lang="pug">
footer(role="contentinfo")
</template>

<script>
export default {
  name: 'footer'
}
</script>

<style lang="stylus">
footer
  height 64px
  display flex
  align-items center
  padding 0 2em
  // position sticky
  // bottom 0
  background-color white
  a
    font-size 14px
    padding 0 .5rem
@media (max-widht: $mobile)
  footer
    padding-left 16px
    padding-right 16px
</style>
