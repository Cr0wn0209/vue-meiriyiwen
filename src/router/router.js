import App from '../App.vue'
import Home from '../page/home/index.vue'
import Day from '../page/day/index.vue'
import Random from '../page/random/index.vue'

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/day/:date',
    component: Day
  },
  {
    path: '/random',
    component: Random
  }
]
