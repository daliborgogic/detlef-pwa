<template lang="pug">
.about
  div(v-html="marked(page.fields.content)")
</template>

<script>
export default {
  name: 'about-view',

  meta () {
    return {
      title: this.page.fields.title,
      description: this.page.fields.description,
      card: this.page.fields.card.fields.file.url + '?w=1920'
    }
  },

  computed: {
    page () {
      function findSlug (slug) {
        return slug.fields.slug === 'about'
      }
      const page = this.$store.state.page.items.find(findSlug)
      return page
    }
  },

  asyncData ({store}) {
    return store.dispatch('page')
  }
}
</script>

<style lang="stylus">
@import "../variables"
hr
  width 20px
  height 0
  overflow visible
  display inline-block
  margin-top 1rem
  margin-bottom 1rem
  border 0
  border-top: 2px solid rgba(black, 1)
</style>
