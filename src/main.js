import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { client } from "./network/ws";

import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
ScatterJS.plugins(new ScatterEOS());
ScatterJS.scatter.connect("https://jacks.eosdice.vip").then(connected => {
  if (!connected) {
    console.log("scatter error");
    return;
  }
  console.log(connected, 'ee')
  if (!scatter.identify) return;
  const account = scatter.identify.accounts.find(
    account => account.blochchain === "eos"
  );
  if (!account) return;
  this.$store.commit("UPDATE_ACCOUNT", {
    account: account
  });
});

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
