import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Particles from "particles.vue";




Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
Vue.use(Particles);

// This is the event hub we'll use in every
// component to communicate between them.
var eventHub = new Vue();
// Distribute to components using global mixin
Vue.mixin({
  data: function() {
      return {
          eventHub: eventHub
      }
  }
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
