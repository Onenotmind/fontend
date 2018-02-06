import Vue from 'vue'
import App from './app.vue'
// import router from './router'
import iView from 'iView'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})
