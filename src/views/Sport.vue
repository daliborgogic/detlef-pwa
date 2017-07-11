<template lang="pug">
.home
  card(:data="sport")
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'sport-view',

  components: { Card},

  props: ['data'],

  meta () {
    return {
      title: 'Sport',
      description: 'Detlef Schneider is a German born photographer whose work is predominantly focused on sport and fashion.',
      card: null
    }
  },

  asyncData ({store}) {
    return store.dispatch('sport')
  },

  computed: {
    sport () {
      return this.$store.state.sport.items
    }
  }
}
</script>
