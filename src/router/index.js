import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ThreePicture from '../views/ThreePicture.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/threePicture',
    name: 'ThreePicture',
    component: ThreePicture
  }
]

const router = new VueRouter({
  routes
})

export default router
