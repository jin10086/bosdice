import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { client } from "./network/ws";

import ScatterJS from "scattterjs-core";
import ScatterEos from "scatterjs-plugin-core";
ScatterJS.plugind(new ScatterEos());
ScatterJS.scatter.connect("https://eosdice.vip").then(connected => {
  if(!connected) return false;
  window.scatter = ScatterJS.scatter;
})

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
