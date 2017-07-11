<template lang="pug">
.singl
  .slide(ref="slide" v-for="i, index in item.fields.images" :key="index")
    .slide-placeholder
      svg(ref="svg"
          :height="i.fields.file.details.image.height"
          :viewBox="'0 0 '+ i.fields.file.details.image.width+' '+i.fields.file.details.image.height"
          :width="i.fields.file.details.image.width" xmlns="http://www.w3.org/2000/svg")
        path(:d="'M0 0h'+i.fields.file.details.image.width+'v'+i.fields.file.details.image.height+'H0z'"
          fill="#F2F2F2")
      img(ref="img"
          :srcset="i.fields.file.url + '?h=1920&fm=jpg&fl=progressive 1024w,'+ \
                   i.fields.file.url + '?h=640&fm=jpg&fl=progressive 640w,'+ \
                   i.fields.file.url + '?w=320&fm=jpg&fl=progressive 320w'"
          sizes="(min-width: 36em) 33.3vw, 100vw"
          :src="i.fields.file.url + '?w=1920&fm=jpg&fl=progressive'"
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
    return {
      loading: true
    }
  },

  asyncData ({store, data}) {
    return store.dispatch('items')
  },

  computed: {
    filter () {
      return this.$store.state.filter
    },

    item () {
      function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key].fields.slug === value)
      }
      let a = getKeyByValue(this.$store.state.items, this.$route.params.singl)
      return  this.$store.state.items[a]
    }
  }
}
</script>

<style lang="stylus">
@import "../variables"
.singl.view
  max-width none
.slide
  display flex
  align-items flex-start
  justify-content center
  height calc(100vh - 80px)
  position relative
  &:last-child
    align-items center
    text-align center
.slide-placeholder
  display flex
  align-items center
  justify-content center
  height calc(100% - 80px)
  position relative
  img
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
    height: calc(100% - 80px)
    width: calc(156.25vh - 80px)

@media (max-width: $mobile)
  .slide
    height auto
    margin-bottom 1rem
    img
    svg
      max-width none
      max-height none
      width 100%
      height auto
    img
      border-color transparent
  .slide iframe
      height calc(56.25vw - 1rem)
      width 100%
</style>
