import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      snackbar: '',
      message: '',
      page: [],
      items: [],
      item: '',
      film: [],
      advertising: [],
      fashion: [],
      sport: []
    },
    actions,
    mutations,
    getters
  })
}
