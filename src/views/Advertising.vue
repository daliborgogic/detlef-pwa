<template lang="pug">
.home
  card(:data="advertising")
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'advertising-view',

  components: { Card },

  props: ['data'],

  meta () {
    return {
      title: 'Advertising',
      description: 'Detlef Schneider is a German born photographer whose work is predominantly focused on sport and fashion.',
      card: null
    }
  },

  asyncData ({store}) {
    return store.dispatch('advertising')
  },

  computed: {
    advertising () {
      return this.$store.state.advertising.items
    }
  }
}
</script>

