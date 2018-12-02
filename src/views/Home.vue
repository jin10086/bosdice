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
        <span>{{$t("home.lastBuy")}}:{{lastBuyPerson}}</span>
        <span class="mobile-on-margin">{{$t("home.countdown")}}:{{showEndTime}}</span>
        <span>{{$t("home.minAmount")}}:{{minAmount}}</span>
      </div>
      <div class="content">
        <span>{{$t("home.fomoPot")}}:{{fomopool}}</span>
      </div>
    </div>
    <div class="main">
      <!-- <dice-rich></dice-rich> -->
      <dice-roll :activeToken="activeToken" :showToekn="token"></dice-roll>
      <div style="display:none">
      <dice-auction class="mobile-none"></dice-auction>
      <div class="mobile-show componet-tab">
        <span :class="{'active-componet': currentComponent === 'dice-roll'}" @click="currentComponent = 'dice-roll'">DICE</span>
        <span :class="{'active-componet': currentComponent === 'dice-auction'}" @click="currentComponent = 'dice-auction'">BICAI AUCTION</span>
      </div>
      <component :is="currentComponent" class="mobile-show" v-bind="currentProp"></component>
      </div>
    </div>
    <dice-order :activeToken="activeToken"></dice-order>
    <el-dialog :visible.sync="announcementDialog" custom-class="announcement-class">
      <h2 slot="title">公告</h2>
      <p class="announce-content">公告</p>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import DiceHeader from "@/components/Header.vue";
import DiceOrder from "@/components/Order.vue";
import DiceRoll from "@/components/Roll.vue";
import DiceAuction from "@/components/Auction.vue";
// import DiceRich from "@/components/Rich.vue";
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
      currentComponent: "dice-roll",
      announcementDialog: false,
      // 毫秒
      announcementEndTime: 1543729427000
    };
  },
  components: {
    DiceHeader,
    DiceRoll,
    DiceOrder,
    DiceAuction
    // DiceRich
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
      return (number / 1000).toFixed(4) + " EOS";
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
        this.showEndTime = this.$t("home.next");
        return;
      }
      left /= 1000;
      let min = Math.floor(left / 60);
      if (min < 10) {
        min = '0' + min;
      }
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
        code: "bocai.game",
        scope: "bocai.game",
        table: "global",
        json: true
      },
      { req_id: "fomo-pot", fetch: true }
    );
    this.ws_identify.onMessage(message => {
      const fomo = handleData(message);
      if(fomo) {
        _this.fomopool = fomo.json.fomopool;
        _this.$store.commit("UPDATE_FOMO", {
          fomo: _this.fomopool
        });
        _this.endTime = fomo.json.endtime;
        _this.lastBuyPerson = fomo.json.lastPlayer;
      }
    });
    setInterval(()=> {
      _this.countDown();
    }, 1000);
    let current = new Date().getTime();
    if (this.announcementEndTime >= current) {
      this.announcementDialog = true;
    }
  }
};
</script>

<style lang="less">
.announcement-class {
  background: linear-gradient(to bottom right, #5f00ff, #ec6e42) !important;
  color: white !important;
}
.announce-content {
  text-align: left;
  color: white!important;
}
@media (max-width: 768px) {
  .announcement-class {
    width: 90%!important;
  }
}
.fomo {
  background-color: #1c233f;
  padding: 15px 15px;
  width: fit-content;
  margin: 0 auto;
  margin-top: 16px;
  .title {
    align-items: center;
    display: flex;
    justify-content: space-between;
    span:nth-child(2) {
      margin: 0 24px;
    }
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
  .mobile-on-margin {
    margin-left: 0 !important;
  }
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
