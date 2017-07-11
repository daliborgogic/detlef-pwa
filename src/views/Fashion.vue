<template lang="pug">
.home
  card(:data="fashion")
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'fashion-view',

  components: { Card },

  props: ['data'],

  meta () {
    return {
      title: 'Fashion',
      description: 'Detlef Schneider is a German born photographer whose work is predominantly focused on sport and fashion.',
      card: null
    }
  },

  asyncData ({store}) {
    return store.dispatch('fashion')
  },

  computed: {
    fashion () {
      return this.$store.state.fashion.items
    }
  }
}
</script>
