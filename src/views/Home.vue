<template lang="pug">
.home
  .cards
    //- (original height / original width) x new width
    router-link(v-for="i, index in items" :to="`/${i.fields.tag}/${i.fields.slug}`" :key="index")
      .card
        svg(ref="svg"
            :height="i.fields.card.fields.file.details.image.height"
            :viewBox="'0 0 '+ i.fields.card.fields.file.details.image.width+' '+i.fields.card.fields.file.details.image.height"
            :width="i.fields.card.fields.file.details.image.width" xmlns="http://www.w3.org/2000/svg")
          path(:d="'M0 0h'+i.fields.card.fields.file.details.image.width+'v'+i.fields.card.fields.file.details.image.height+'H0z'"
            fill="#F2F2F2")
        img(ref="img"
            :data-srcset="i.fields.card.fields.file.url + '?w=360&fl=progressive 1024w,'+ \
                          i.fields.card.fields.file.url + '?w=360&fl=progressive 640w,'+ \
                          i.fields.card.fields.file.url + '?w=360&fl=progressive 320w'"
            sizes="(min-width: 36em) 33.3vw, 100vw"
            :alt="i.fields.card.fields.title")
            //-:src="i.fields.card.fields.file.url + '?w=360&fm=jpg&fl=progressive'"
        svg.icon.icon-video(v-if="i.fields.video" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg")
          path(d="M8 5v14l11-7z")
          path(d="M0 0h24v24H0z" fill="none")
        .card-overlay
          h2 {{i.fields.title}}

  //-pre {{items}}
</template>

<script>
export default {
  name: 'home-view',

  meta () {
    return {
      title: '',
      description: 'Detlef Schneider is a German born photographer whose work is predominantly focused on sport and fashion.',
      card: null
    }
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

    items () {
      return this.$store.state.items
    }
  },
  mounted () {
    const imgs = [ ...this.$refs.img]
    if ('IntersectionObserver' in window) {
      // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
      // https://developers.google.com/web/updates/2016/04/intersectionobserver
      const observer =  new IntersectionObserver(entries => {
        entries.forEach(change => {
          if (change.isIntersecting === true) {
            change.target.setAttribute('srcset', change.target.getAttribute('data-srcset'))
          }
        })
      })

      imgs.forEach(img => observer.observe(img))
    } else {
      imgs.forEach(img => {
        img.setAttribute('srcset', img.getAttribute('data-srcset'))
      })
    }
  },

  beforeDestroy () {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {})
      const imgs = [ ...this.$refs.img]

      imgs.forEach(img => observer.unobserve(img))
    }
  }
}
</script>

<style lang="stylus">
@import "../variables"
.home.view
  max-width calc(390px * 3 + 2px)
.cards
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
  svg
    width 100%
    height auto
    vertical-align middle
  img
    color transparent
    position absolute
    outline none
    top 0
    left 0
.icon-video
  position absolute
  left calc(50% - 20px)
  top calc(50% - 20px)
  fill rgba(white, .7)
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
    font-weight 300
    text-align center
  &:hover
    background-color rgba(white, .7)
    h2
      color black
@media (max-width: $mobile)
  .cards
    column-count 1
    column-gap 0
  .card
    margin-bottom 1rem
</style>

