import Vue from 'vue'
import Router from'vue-router'

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
const Contact = () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue')
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
const NotFound = () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue')

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    //scrollBehavior: () => ({ y: 0 }),
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      return { x: 0, y: 0 }
    },
    routes: [
      { path: '/', component: Home },
      { path: '/contact', component: Contact },
      { path: '/about', component: About },
      { path: '*', component: NotFound }
    ]
  })
}


