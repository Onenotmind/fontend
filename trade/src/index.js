import Vue from 'vue'
import App from './app.vue'
// import router from './router'
import iView from 'iView'
import VueI18n from 'vue-i18n'
import en from 'iview/dist/locale/en-US'
import zh from 'iview/dist/locale/zh-CN'
import 'iview/dist/styles/iview.css'

Vue.use(VueI18n)
Vue.use(iView)
Vue.locale = () => {}
// Ready translated locale messages
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

new Vue({
  el: '#app',
  // router,
  i18n: i18n,
  template: '<App/>',
  components: { App }
})
