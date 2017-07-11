<template lang="pug">
.home
  card(:data="all")
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'home-view',

  components: { Card },

  props: ['data'],

  meta () {
    return {
      title: 'Photographer',
      description: 'Detlef Schneider is a German born photographer whose work is predominantly focused on sport and fashion.',
      card: null
    }
  },

  asyncData ({ store }) {
    return store.dispatch('items')
  },

  computed: {
    all () {
      return this.$store.state.items
    }
  }
}
</script>

<style lang="stylus">
@import "../variables"
.home.view
  max-width calc(390px * 3 + 2px)
ul
  padding-left 0
  padding-bottom 10rem
  margin 0
  list-style none
  column-count 3
  column-gap 30px
  column-width 100%
.card
  -webkit-column-break-inside avoid
  page-break-inside avoid
  break-inside avoid
  position relative
  margin-bottom 50px
  img
  .placeholder
    width 100%
    height auto
    vertical-align middle
  img
    color transparent
    position absolute
    top 0
    left 0
.icon-video
  position absolute
  left calc(50% - 20px)
  top calc(50% - 20px)
  fill rgba(white, 1)
  width 40px
  height 40px
.card-overlay
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  background-color transparent
  transition background-color 250ms linear
  h2
    transition color 250ms linear
    color transparent
    font-size 1.4375rem
    line-height 1.2
    font-weight 300
    text-align center
    padding 0 1rem
  &:hover
    background-color rgba(white, .7)
    h2
      color black
@media (max-width: $mobile)
  ul
    column-count 1
    column-gap 0
  .card
    margin-bottom 1rem
</style>

