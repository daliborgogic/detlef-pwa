import Vue from 'vue'
import Router from'vue-router'

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
const Singl = () => import(/* webpackChunkName: "singl" */ '@/views/Singl.vue')
const Contact = () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue')
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
const NotFound = () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue')

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash

      // specify offset of the element
      if (to.hash === '#anchor2') {
        position.offset = { y: 100 }
      }
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    // https://router.vuejs.org/en/advanced/scroll-behavior.html
    // scrollBehavior: () => ({ y: 0 }),
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      return { x: 0, y: 0 }
    },
    scrollBehavior,
    routes: [
      {
        path: '/',
        component: Home,
        meta: { scrollToTop: true }
      },
      {
        path: '/:tag/:singl',
        component: Singl
      },
      { path: '/contact', component: Contact },
      { path: '/about', component: About },
      { path: '*', component: NotFound }
    ]
  })
}


