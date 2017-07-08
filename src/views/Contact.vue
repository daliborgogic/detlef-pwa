<template lang="pug">
.contact
  div(v-html="marked(page.fields.content)")
  //-pre.
    {{page}}
</template>

<script>
export default {
  name: 'contact-view',

  meta () {
    return {
      title: this.page.fields.title,
      description: this.page.fields.description,
      card: this.page.fields.card || null
    }
  },

  computed: {
    page () {
      function findSlug (slug) {
        return slug.fields.slug === 'contact'
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
.contact.view
  display flex
  justify-content center
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
