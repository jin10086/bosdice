<template>
  <div class="home">
    <dice-header></dice-header>
    <div class="tab-btns">
      <div v-for="(coin, index) in supportCoin" :key="index" class="btn" @click="switchToken(index)" :class="{active: index === activeToken}">
        <img :src="coin.src"/>
        <div class="mobile-none">{{coin.symbol}}</div>
      </div>
    </div>
    <div class="fomo">
      <div class="title">
        <span>最后购买者:{{lastBuyPerson}}</span>
        <span>倒计时:{{showEndTime}}</span>
        <span>参与FOMO最低投注金额:{{minAmount}}</span>
      </div>
      <div class="content">
        <span>FOMO奖池:{{fomopool}}</span>
      </div>
    </div>
    <div class="main">
      <dice-rich></dice-rich>
      <dice-roll :activeToken="activeToken" :showToekn="token" class="mobile-none"></dice-roll>
      <dice-auction class="mobile-none"></dice-auction>
      <div class="mobile-show componet-tab">
        <span :class="{'active-componet': currentComponent === 'dice-roll'}" @click="currentComponent = 'dice-roll'">DICE</span>
        <span :class="{'active-componet': currentComponent === 'dice-auction'}" @click="currentComponent = 'dice-auction'">BICAI AUCTION</span>
      </div>
      <component :is="currentComponent" class="mobile-show" v-bind="currentProp"></component>
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
import DiceRich from "@/components/Rich.vue";
import { login } from "@/util/login";
import { api, supportCoin } from "@/network/transtion";
import { handleData } from "@/network/ws.js";
import { mapGetters } from "vuex";

export default {
  name: "home",
  data() {
    return {
      supportCoin: supportCoin,
      activeToken: "eos",
      ws_identify: "",
      endTime: "",
      lastBuyPerson: "",
      showEndTime: "",
      fomopool: "",
      currentComponent: "dice-roll"
    };
  },
  components: {
    DiceHeader,
    DiceRoll,
    DiceOrder,
    DiceAuction,
    DiceRich
  },
  computed: {
    currentProp() {
      return this.currentComponent === "dice-roll" ? {
        activeToken: this.activeToken,
        showToekn: this.token 
      } : {};
    },
    minAmount() {
      const number = this.fomopool.split(" ")[0];
      return number < 500 ? "0.5 EOS" : (number / 1000) + " EOS";
    },
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
    },
    countDown() {
      let current = new Date().getTime();
      let left = this.endTime * 1000 - current;
      if (left <= 0) {
        this.showEndTime = "等待下一局开始";
        return;
      }
      left /= 1000;
      const min = '0' + Math.floor(left / 60);
      let sec = Math.floor(left % 60);
      if (sec < 10) {
        sec = '0' + sec;
      }
      this.showEndTime = `${ min }:${ sec }`;
    },
  },
  mounted() {
    const _this = this;
    this.ws_identify = this.$ws.getTableRows(
      {
        code: "eosbocai2222",
        scope: "eosbocai2222",
        table: "global",
        json: true
      },
      { req_id: "fomo-pot", fetch: true }
    );
    this.ws_identify.onMessage(message => {
      const fomo = handleData(message);
      if(fomo) {
        _this.fomopool = fomo.json.fomopool;
        _this.endTime = fomo.json.endtime;
        _this.lastBuyPerson = fomo.json.lastPlayer;
      }
    });
    setInterval(()=> {
      _this.countDown();
    }, 1000);
  }
};
</script>

<style lang="less">
.fomo {
  background-color: #1c233f;
  width: 800px;
  padding: 15px 15px;
  margin: 0 auto;
  margin-top: 16px;
  .title {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .content {
    text-align: center;
    font-size: 28px;
    margin-top: 10px;
    font-weight: 600;
  }
}
.mobile-show {
  display: none;
}
@media (max-width: 768px) {
  .mobile-show {
    display: block;
  }
  .componet-tab {
    color: #989a99;
    display: flex;
    justify-content: center;
    span {
      display: block;
      height: 30px;
      width: 130px;
      text-align: center;
    }
    // span:first-child {
    //   // padding-right: 24px;
    //   text-align: right;
    // }
    // span:last-child {
    //   // padding-left: 36px;
    //   text-align: left;
    // }
    .active-componet {
      color: #fff;
      border-bottom: 1px solid #fff;
    }
  }
  .fomo {
    width: 90%;
    .title {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .main {
    display: flex;
    flex-direction: column;
  }
}
.main{
  display: flex;
  justify-content: center;
}
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
