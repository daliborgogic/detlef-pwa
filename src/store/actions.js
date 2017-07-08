import {} from '../api'
const contentful = require('contentful')

const SPACE_ID = 'xzw2qzqp3wi2'
const ACCESS_TOKEN = 'c439fd325747c14994ab197531df494c48204c9a6fed7c374ce5e7142138a202'

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
})

export default {
  snackbar: (context, message) => {
    context.commit('SNACKBAR', message)
  },

  filter: (context, message) => {
    context.commit('FILTER', message)
  },

  session: (context, message) => {
    context.commit('SESSION', message)
  },

  page({ commit, state }) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: 'page'
      }).then(res => {
        commit('PAGE', res)
        resolve()
      })
      .catch((err => {
        console.error(err)
      }))
    })
  },

  items({ commit, state }) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: 'item'
      })
      .then(res => {
        commit('ITEMS', res.items)
        resolve()
      })
      .catch((err => {
        console.error(err)
      }))
    })
  },

  item({ commit, state }, { singl }) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: 'item'
      })
      .then(item => {
        console.log(item.items)
        console.log('FOUND ', [item.items].filter(task => task.fields.slug === 'slug'))
        commit('ITEM', item )
        resolve()
      })
      .catch((err => {
        console.error(err)
      }))


    })
  }
}
