<template lang="pug">
ul(ref="root")
  li.card(ref="card"
    v-for="i, index in data"
    :to="`/${i.fields.tag}/${i.fields.slug}`"
    :data-slide="index"
    :key="index")
    svg.placeholder(ref="svg"
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
      :data-src="i.fields.card.fields.file.url + '?w=360&fm=jpg&fl=progressive'"
      :alt="i.fields.card.fields.title")
    svg.icon.icon-video(v-if="i.fields.video"
      fill="#FFFFFF"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg")
      path(d="M8 5v14l11-7z")
      path(d="M0 0h24v24H0z" fill="none")
    router-link(:to="`/${i.fields.tag}/${i.fields.slug}`")
      .card-overlay
        h2 {{i.fields.title}}
</template>

<script>
export default {
  name: 'card',

  props: ['data'],

  mounted () {
    // https://developers.google.com/web/updates/2016/04/intersectionobserver
    if (typeof IntersectionObserver === 'undefined') {
      console.warn(`IntersectionObserver API is not available in your browser.`)
      import(/* webpackChunkName: "intersection-observer" */ 'intersection-observer')
    } else  {
      const cards = [ ...this.$refs.card]
      const observer =  new IntersectionObserver(entries => {
        entries.forEach(change => {
          if (change.isIntersecting === true) {
            const count = change.target.getAttribute('data-slide')
            console.log(count ,' in view')
            this.$refs.img[count].setAttribute('srcset', this.$refs.img[count].getAttribute('data-srcset'))
            this.$refs.img[count].setAttribute('src', this.$refs.img[count].getAttribute('data-src'))
          }
        })
      },{
        root: this.$refs.root[0],
        rootMargin: '-80px',
        threshold: [0],
      })

      cards.forEach(card => observer.observe(card))
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
    margin-bottom .25rem
</style>


