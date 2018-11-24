<template>
  <div class="home">
    <dice-header></dice-header>
    <div v-for="(or, index) in order" :key="index">
      {{or.player}}
      {{or.random_roll}}
      {{or.roll_under}}
    </div>
    <div class="tab-btns">
      <div v-for="(coin, index) in supportCoin" :key="index" class="btn" @click="switchToken(index)">
        <img :src="coin.src" />
        <div>{{coin.symbol}}</div>
      </div>
    </div>
    <button @click="login">登录</button>
    <button @click="roll">Roll</button>
    EOS:{{eosBalance}}, {{token.toUpperCase()}}: {{otherToken}}
  </div>
</template>

<script>
// @ is an alias to /src
import DiceHeader from "@/components/Header.vue";
import { handleData } from "@/network/ws.js";
import { login } from "@/util/login";
import { api, supportCoin } from "@/network/transtion";
import { mapGetters } from "vuex";

export default {
  name: "home",
  data() {
    return {
      ws_identify: "",
      order: [
        {
          account: "hy"
        }
      ],
      supportCoin: supportCoin,
      activeToken: "eos"
    };
  },
  components: {
    DiceHeader
  },
  computed: {
    ...mapGetters(["eosBalance", "otherToken"]),
    token: {
      get() {
        return this.activeToken === "eos" ? "bocai" : this.activeToken;
      },
      set(newValue) {
        this.activeToken = newValue;
        window.localStorage.setItem("diceToken", newValue);
      }
    }
  },
  watch: {
    token(newValue) {
      this.$store.dispatch("UPDATE_TOKEN_ASYNC", {
        type: newValue === "eos" ? "bocai" : newValue
      });
    }
  },
  methods: {
    login() {
      login(this);
    },
    roll() {
      api(
        this.activeToken,
        "transfer",
        {
          from: this.$store.state.account.name,
          to: "eosbocai2222",
          quantity: 0.5,
          memo: `dice-${new Date().getTime()}-96-`
        },
        this
      );
    },
    switchToken(token) {
      console.log(token, "switchtoken");
      this.token = token;
    }
  },
  mounted() {
    const _this = this;
    this.ws_identify = this.$ws.getActionTraces(
      {
        account: "eosbocailogs",
        action_name: "result",
        receiver: "eosbocailogs"
      },
      { req_id: "roll_result" }
    );
    this.ws_identify.onMessage(message => {
      handleData(message, _this.order);
    });
  },

  destroyed() {
    console.log(this.ws_identify);
    this.ws_identify.unlisten();
  }
};
</script>

<style lang="less">
.tab-btns {
  height: 30px;
  display: flex;
  width: 600px;
  justify-content: center;
  .btn {
    height: 26px;
    line-height: 26px;
    display: flex;
    background-color: #252e51;
    color: white;
    border-radius: 4px;
    padding: 6px 12px;
    margin-right: 12px;
    cursor: pointer;
    img {
      height: 26px;
      margin-right: 6px;
    }
  }
}
</style>
