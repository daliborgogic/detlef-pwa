<template lang="pug">
.home
  card(:data="film")
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'film-view',

  components: { Card },

  props: ['data'],

  meta () {
    return {
      title: 'Film',
      description: 'Detlef Schneider is a German born photographer whose work is predominantly focused on sport and fashion.',
      card: null
    }
  },

  asyncData ({store}) {
    return store.dispatch('film')
  },

  computed: {
    film () {
      return this.$store.state.film.items
    }
  }
}
</script>

