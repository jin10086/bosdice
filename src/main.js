import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { client } from "./network/ws";

Vue.config.productionTip = false
Vue.prototype.$ws = client;

Vue.prototype.$ws
  .connect()
  .then(() => {
    console.log('connect success');
  })
  .catch(error => {
    console.log("Unable to connect to dfuse endpoint.", error);
  });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
