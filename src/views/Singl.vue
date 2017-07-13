<template lang="pug">
.singl(ref="singl")
  .slide(ref="slide"
      v-for="i, index in item.fields.images"
      :data-slide="index")
    .slide-placeholder
      svg(ref="svg"
          :height="i.fields.file.details.image.height"
          :viewBox="'0 0 '+ i.fields.file.details.image.width+' '+i.fields.file.details.image.height"
          :width="i.fields.file.details.image.width" xmlns="http://www.w3.org/2000/svg")
        path(:d="'M0 0h'+i.fields.file.details.image.width+'v'+i.fields.file.details.image.height+'H0z'"
          fill="#F2F2F2")
      img(ref="img"
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
  .slide(ref="slideFooter" v-bind:data-slide="slides")
    .slide-placeholder
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
      slides: 0
    }
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

    scrollIt (destination, duration = 200, easing = 'linear', callback) {

      const easings = {
        linear(t) {
          return t;
        },
        easeInQuad(t) {
          return t * t;
        },
        easeOutQuad(t) {
          return t * (2 - t);
        },
        easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        easeInCubic(t) {
          return t * t * t;
        },
        easeOutCubic(t) {
          return (--t) * t * t + 1;
        },
        easeInOutCubic(t) {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        easeInQuart(t) {
          return t * t * t * t;
        },
        easeOutQuart(t) {
          return 1 - (--t) * t * t * t;
        },
        easeInOutQuart(t) {
          return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        },
        easeInQuint(t) {
          return t * t * t * t * t;
        },
        easeOutQuint(t) {
          return 1 + (--t) * t * t * t * t;
        },
        easeInOutQuint(t) {
          return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
        }
      };

      const start = window.pageYOffset;
      const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

      const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
      const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
      const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

      if ('requestAnimationFrame' in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
          callback();
        }
        return;
      }

      function scroll() {
        const now = 'now' in window.performance ? performance.now() : new Date().getTime();
        const time = Math.min(1, ((now - startTime) / duration));
        const timeFunction = easings[easing](time);
        window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

        if (window.pageYOffset === destinationOffsetToScroll) {
          if (callback) {
            callback();
          }
          return;
        }

        requestAnimationFrame(scroll);
      }

      scroll();

      // this.scrollIt(
      //   el,
      //   300,
      //   'easeOutQuad',
      //   () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
      // )
    }
  },
  mounted () {
    // https://developers.google.com/web/updates/2016/04/intersectionobserver
    if (typeof IntersectionObserver === 'undefined') {
      console.warn(`IntersectionObserver API is not available in your browser.`)
      require('intersection-observer')
    } else  {
      const slides = [ ...this.$refs.slide, this.$refs.slideFooter]
      this.slides = slides.length - 1
      console.log(slides)
      const observer =  new IntersectionObserver(entries => {
        entries.forEach(change => {
          let foo = 0
          if (change.isIntersecting === true) {
            const count = change.target.getAttribute('data-slide')

            if (slides.length - count !== 1) {
              this.$refs.img[count].setAttribute('srcset', this.$refs.img[count].getAttribute('data-srcset'))
              this.$refs.img[count].setAttribute('src', this.$refs.img[count].getAttribute('data-src'))
            }

            this.scrollIt(
              change.target,
              300,
              'easeOutQuad',
              () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
            )
          }
        })
      },{
        root: this.$refs.singl[0], //
        rootMargin: '-40px',
        threshold: [0],
      })

      slides.forEach(slide => observer.observe(slide))
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
    padding 80px 0
    max-height 100%
  svg
    max-width 100%
    max-height 100%
    padding 80px 0
    vertical-align middle
  svg
    width 100%
  img
    font-size 13px
    position absolute
.slide-back
  max-width 500px
  h3
    margin-top 0
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
