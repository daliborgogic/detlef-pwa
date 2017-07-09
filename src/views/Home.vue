<template lang="pug">
.home
  .cards
    //- (original height / original width) x new width
    router-link(v-for="i, index in items" :to="`/${i.fields.tag}/${i.fields.slug}`" :key="index")
      .card(ref="card" :style="`background-image: url(${i.fields.card.fields.file.url}?w=360&fl=progressive); padding-top: ${(i.fields.card.fields.file.details.image.height / i.fields.card.fields.file.details.image.width) * 100}%`")
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
     // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
    let observer = new IntersectionObserver(entries => {
      entries.forEach(change => {
        if (change.isIntersecting === true) {
          // change.target.srcset = change.target.getAttribute('data-srcset')
          // change.target.src = change.target.getAttribute('data-src')
        }
      })
    })

    const cards = [ ...this.$refs.card]

    cards.forEach(card => observer.observe(card))
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
  background-color lightness(black, 95%)
  background-size cover
  background-position center center
  position relative
  margin-bottom 50px
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

