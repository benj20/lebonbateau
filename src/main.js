// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueFilter from 'vue-filter'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueFilter)

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    component: require('./components/Ads.vue'),
    name: 'root'
  }, {
    path: '/ad',
    component: require('./components/Ad.vue'),
    name: 'ad'
  }, {
    path: '/deposit-ad',
    component: require('./components/Deposit-ad.vue'),
    name: 'deposit-ad'
  }, {
    path: '*',
    redirect: '/'
  }]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(require('./App.vue'))
})
