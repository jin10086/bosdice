import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from "vue-i18n";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import cn from "@/lang/cn";
import en from "@/lang/en";
import { client } from "./network/ws";

Vue.use(VueI18n);
Vue.use(ElementUI);
const i18n = {
  locale: window.localStorage.getItem("dicelang") ? window.localStorage.getItem("dicelang"): "en",
  messages: {
    cn: cn,
    en: en
  } 
}

import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
ScatterJS.plugins(new ScatterEOS());
ScatterJS.scatter.connect("https://eosdice.vip").then(connected => {
  if (!connected) {
    if (!window.localStorage.getItem("dicelang") || window.localStorage.getItem("dicelang") === "en"){
      alert("Fail to connect to Scatter Wallet");
    } else {
      alert("Scatter钱包连接失败");
    }
    return;
  }
  console.log(connected, 'ee')
  window.scatter = ScatterJS.scatter;
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
  i18n,
  render: h => h(App)
}).$mount('#app')
