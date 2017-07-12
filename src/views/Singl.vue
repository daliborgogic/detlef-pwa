<template lang="pug">
.singl(tabindex="0" @keyup.up="up" @keyup.down="down" @keyup.space="space")
  .slide(ref="slide" v-for="i, index in item.fields.images")
    .slide-placeholder
      svg(ref="svg"
          :height="i.fields.file.details.image.height"
          :viewBox="'0 0 '+ i.fields.file.details.image.width+' '+i.fields.file.details.image.height"
          :width="i.fields.file.details.image.width" xmlns="http://www.w3.org/2000/svg")
        path(:d="'M0 0h'+i.fields.file.details.image.width+'v'+i.fields.file.details.image.height+'H0z'"
          fill="#F2F2F2")
      img(v-observe-visibility="visibilityChanged"
          :data-srcset="i.fields.file.url + '?h=1920&fm=jpg&fl=progressive 1024w,'+ \
                   i.fields.file.url + '?h=1080&fm=jpg&fl=progressive 640w,'+ \
                   i.fields.file.url + '?w=320&fm=jpg&fl=progressive 320w'"
          sizes="(min-width: 719px) 33.3vw, 100vw"
          :data-src="i.fields.file.url + '?w=1920&fm=jpg&fl=progressive'"
          :alt="i.fields.title")
  .slide(v-if="item.fields.video")
    iframe(:src="item.fields.video"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen)
  .slide
    .slide-back
      h3(v-if="item.fields.description") {{item.fields.description}}
      router-link(to="/" exact) Back to Overview
</template>

<script>
export default {
  name: 'single-view',

  meta () {
    const meta = {
      title: this.item.fields.title,
      description: this.item.fields.description,
      card: this.item.fields.card.fields.file.url + '?w=1920'
    }
    return meta
  },

  data () {
    return {}
  },

  asyncData ({store, data}) {
    return store.dispatch('items')
  },

  computed: {
    item () {
      function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key].fields.slug === value)
      }
      let a = getKeyByValue(this.$store.state.items, this.$route.params.singl)
      return  this.$store.state.items[a]
    }
  },

  methods: {
    visibilityChanged (isVisible, entry) {
      if (isVisible === true) {
        entry.target.setAttribute('srcset', entry.target.getAttribute('data-srcset'))
        entry.target.setAttribute('src', entry.target.getAttribute('data-src'))
      }
    },
    up () {
      console.log('Up')
    },

    down () {
      console.log('Down')
    },

    space () {
      console.log('Space')
    }
  }
}
</script>

<style lang="stylus">
@import "../variables"
.singl.view
  max-width none
  margin-top 0
.slide
  display flex
  align-items flex-start
  justify-content center
  height 100vh
  padding 80px 0
  position relative
  &:last-child
    align-items center
    text-align center
.slide-placeholder
  display flex
  align-items center
  justify-content center
  height 100%
  position relative
  img
    max-width 100%
    max-height 100%
  svg
    max-width 100%
    max-height 100%
    vertical-align middle
  svg
    width 100%
  img
    font-size 13px
    position absolute
.slide-back
  max-width 500px
  h3
    font-size 23px
  a
    font-size 13px
  iframe
    height 100%
    width 156.25vh

@media (max-width: $mobile)
  .slide
    height auto
    padding-top 0
    padding-bottom .25rem
    img
    svg
      max-width none
      max-height none
      width 100%
      height auto
    img
      border-color transparent
    iframe
      height calc(56.25vw - 1rem)
      width 100%
</style>
