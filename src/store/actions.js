import {} from '../api'
const contentful = require('contentful')

const SPACE_ID = process.env.SPACE_ID
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
})

export default {
  snackbar: (context, message) => {
    context.commit('SNACKBAR', message)
  },

  page({ commit, state }) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: 'page'
      })
      .then(res => {
        commit('PAGE', res)
        resolve()
      })
      .catch((err => console.error(err)))
    })
  },

  items({ commit, state }) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: 'item',
         order: 'fields.position'
      })
      .then(res => {
        commit('ITEMS', res.items)
        resolve()
      })
      .catch((err => console.error(err)))
    })
  },

  item({ commit, state }) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: 'item'
      })
      .then(item => {
        commit('ITEM', item )
        resolve()
      })
      .catch((err => console.error(err)))
    })
  },

  film({ commit, state }) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: 'item',
       'fields.tag': 'film'
      })
      .then(item => {
        commit('FILM', item)
        resolve()
      })
      .catch((err => console.error(err)))
    })
  },

  fashion({ commit, state }) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: 'item',
       'fields.tag': 'fashion'
      })
      .then(item => {
        commit('FASHION', item)
        resolve()
      })
      .catch((err => console.error(err)))
    })
  },

  advertising({ commit, state }) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: 'item',
       'fields.tag': 'advertising'
      })
      .then(item => {
        commit('ADVERTISING', item)
        resolve()
      })
      .catch((err => console.error(err)))
    })
  },

  sport({ commit, state }) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: 'item',
       'fields.tag': 'sport'
      })
      .then(item => {
        commit('SPORT', item)
        resolve()
      })
      .catch((err => console.error(err)))
    })
  }
}
