import Vue from 'vue'
import VueRouter from 'vue-router'
import Ranking from '../views/Ranking.vue'
import UserView from '../views/UserView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/ranking',
    name: 'Ranking',
    component: Ranking
  },
  {
    path: '/',
    redirect: { name: 'Ranking' }
  },
  {
    path: '/:username',
    name: 'UserView',
    component: UserView,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
