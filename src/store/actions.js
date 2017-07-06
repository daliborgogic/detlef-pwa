import {} from '../api'

export default {
  snackbar: (context, message) => {
    context.commit('SNACKBAR', message)
  }
}
