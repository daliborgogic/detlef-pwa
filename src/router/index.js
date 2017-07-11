import Vue from 'vue'
import Router from'vue-router'

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
const Singl = () => import(/* webpackChunkName: "singl" */ '@/views/Singl.vue')
const Contact = () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue')
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
const NotFound = () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue')
const Film = () => import(/* webpackChunkName: "not-found" */ '@/views/Film.vue')
const Advertising = () => import(/* webpackChunkName: "not-found" */ '@/views/Advertising.vue')
const Fashion = () => import(/* webpackChunkName: "not-found" */ '@/views/Fashion.vue')
const Sport = () => import(/* webpackChunkName: "not-found" */ '@/views/Sport.vue')

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    // https://router.vuejs.org/en/advanced/scroll-behavior.html
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', component: Home, },
      { path: '/film', component: Film },
      { path: '/advertising', component: Advertising },
      { path: '/fashion', component: Fashion },
      { path: '/sport', component: Sport },
      { path: '/contact', component: Contact },
      { path: '/about', component: About },
      { path: '/:tag/:singl', component: Singl },
      { path: '*', component: NotFound },

    ]
  })
}


