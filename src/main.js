import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vuex.Store(store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render (createElement) {
    return createElement(App)
  }
})
