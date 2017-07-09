<template lang="pug">
.singl
  .slide(v-for="i, index in item.fields.images" :key="index")
    .slide-placeholder
      svg(:height="i.fields.file.details.image.height" :viewBox="'0 0 '+ i.fields.file.details.image.width+' '+i.fields.file.details.image.height" :width="i.fields.file.details.image.width" xmlns="http://www.w3.org/2000/svg")
        path(:d="'M0 0h'+i.fields.file.details.image.width+'v'+i.fields.file.details.image.height+'H0z'" fill="#F2F2F2")
      img(v-show="loading === false" ref="img" :src="i.fields.file.url + '?w=1920&fl=progressive'")
  .slide(v-if="item.fields.video")
    iframe(:src="item.fields.video" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen)
  .slide(v-if="item.fields.description")
    .slide-back
      h3 {{item.fields.description}}
      router-link(to="/") Back to Overview
  //-pre {{item}}
</template>

<script>
export default {
  name: 'single-view',

  meta () {
    const meta = {
      title: '',
      description: '',
      card: ''
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
  },

  mounted () {
    [].forEach.call(this.$refs.img, img => {
      img.onload = () => {
        this.loading = false
      }
    })
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
  height 100%
  position relative
  img
  svg
    max-width calc(100% - 80px)
    max-height calc(100% - 80px)
    vertical-align middle
  img
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
  .slide iframe
      height calc(56.25vw - 1rem)
      width 100%
</style>
