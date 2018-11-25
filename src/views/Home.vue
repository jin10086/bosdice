<template>
  <div class="home">
    <dice-header></dice-header>
    <div class="tab-btns">
      <div v-for="(coin, index) in supportCoin" :key="index" class="btn" @click="switchToken(index)" :class="{active: index === activeToken}">
        <img :src="coin.src"/>
        <div class="mobile-none">{{coin.symbol}}</div>
      </div>
    </div>
    <div class="main">
      <dice-roll :activeToken="activeToken" :showToekn="token"></dice-roll>
      <dice-auction></dice-auction>
    </div>
    <dice-order></dice-order>
  </div>
</template>

<script>
// @ is an alias to /src
import DiceHeader from "@/components/Header.vue";
import DiceOrder from "@/components/Order.vue";
import DiceRoll from "@/components/Roll.vue";
import DiceAuction from "@/components/Auction.vue";
import { login } from "@/util/login";
import { api, supportCoin } from "@/network/transtion";
import { mapGetters } from "vuex";

export default {
  name: "home",
  data() {
    return {
      supportCoin: supportCoin,
      activeToken: "eos"
    };
  },
  components: {
    DiceHeader,
    DiceRoll,
    DiceOrder,
    DiceAuction
  },
  computed: {
    token: {
      get() {
        return this.activeToken === "eos" ? "bocai" : this.activeToken;
      },
      set(newValue) {
        this.activeToken = newValue;
        window.localStorage.setItem("diceToken", newValue);
      }
    },
    ...mapGetters(["username"])
  },
  watch: {
    token(newValue) {
      if (this.username) {
        this.$store.dispatch("UPDATE_TOKEN_ASYNC", {
          type: newValue === "eos" ? "bocai" : newValue
        });
      }
    },
    username(newValue) {
      if (newValue) {
        this.$store.dispatch("UPDATE_TOKEN_ASYNC", {
          type: newValue === "eos" ? "bocai" : this.token
        });
      }
    }
  },
  methods: {
    switchToken(token) {
      console.log(token, "switchtoken");
      this.token = token;
    }
  }
};
</script>

<style lang="less">
.active {
  background-color: #f1940f !important;
}
.tab-btns {
  height: 58px;
  display: flex;
  flex-wrap: no-wrap;
  margin: 0 auto;
  padding: 16px 0 5px;
  overflow-x: auto;
  max-width: fit-content;
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3c4771;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: #1c233f;
  } 
  .btn {
    height: 32px;
    line-height: 32px;
    display: flex;
    align-items: center;
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
.main {
  display: flex;
}
</style>
