<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div v-for="(or, index) in order" :key="index">
      {{or.player}}
      {{or.random_roll}}
      {{or.roll_under}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { handleData } from "@/network/ws.js";

export default {
  name: "home",
  data() {
    return {
      ws_identify: "",
      order: [
        {
          account: "hy"
        }
      ]
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    const _this = this;
    this.ws_identify = this.$ws.getActionTraces({ account: "eosbocailogs", action_name: "result", receiver: "eosbocailogs" }, {req_id: 'roll_result'})
    this.ws_identify.onMessage((message) => {
      handleData(message, _this.order);
    });
  },

  destroyed() {
    console.log(this.ws_identify);
    this.ws_identify.unlisten();
  },
};
</script>
