import Vue from 'vue'
import Router from 'vue-router'
import WeatherForm from '@/components/WeatherForm'
import cryptoAPI from '@/components/cryptoAPI'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/weather',
      name: 'WeatherForm',
      component: WeatherForm
    },
    {
      path: '/',
      name: 'cryptoAPI',
      component: cryptoAPI
    },
  ]
})
