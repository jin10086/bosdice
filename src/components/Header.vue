<template>
  <div>
    <div class="header">
      <img src="../assets/eosdice.png" class="logo">
      <div class="right">
        <div class="mobile-none">
          <!-- <el-button type="text" @click="(window.open('https://jacks.eosdice.vip'))">EOSJACKS</el-button> -->
          <!-- <el-button type="text">历史公告</el-button> -->
          <!-- <el-button
            type="text"
            @click="window.open('https://deltadex.io/embed/eosdicevip/bosdicetokem-BOCAI', '_self')"
          >{{$t("header.exchange")}}</el-button> -->
          <!-- <el-button type="text" @click="openVip">VIP</el-button> -->
          <el-button type="text" @click="getfree">获取免费TOKEN</el-button>
          <!-- <el-button type="text" @click="roadmapDialog=true">{{$t("header.Roadmap")}}</el-button> -->
          <!-- <el-button type="text" @click="divideDialog = true">{{$t("header.PayoutPool")}}</el-button> -->
          <!-- <el-button type="text" @click="openToken">{{$t("header.tokenDetail")}}</el-button> -->
          <el-button type="text" @click="openHowto">{{$t("header.howtoplay")}}</el-button>
          <el-button type="text" @click="inviteFriend=true">{{$t("header.Referrals")}}</el-button>
          <el-button type="text" style="margin: 0 10px;" @click="openContact">{{$t("header.Social")}}</el-button>
        </div>
        <el-button type="text">
          <span v-if="username" @click="logout">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <span v-else @click="login">{{$t("header.LOGIN")}}</span>
        </el-button>
        <el-dialog :visible.sync="inviteFriend" custom-class="custom-class">
          <h3 slot="title">{{$t("header.GetRewardedWithReferrals")}}</h3>
          <div class="refer-class">
            <input v-model="myRefer" id="referId">
            <el-button type="primary" @click="copyLink">{{$t("header.Copy")}}</el-button>
          </div>
          <h3 style="color:#fff; text-align:left; margin-top:10px">{{$t("header.refword")}}</h3>
        </el-dialog>
        <el-dropdown @command="changeLang" class="dice-dropdwon">
          <span class="el-dropdown-link">
            <div v-if="dicelang === 'en'">
              <img src="../assets/lang-en.svg">
              &nbsp;{{$t("header.en")}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <div v-if="dicelang === 'cn'">
              <img src="../assets/lang-cn.svg">
              &nbsp;{{$t("header.cn")}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="en">
              <img src="../assets/lang-en.svg">
              &nbsp;{{$t("header.en")}}
            </el-dropdown-item>
            <el-dropdown-item command="cn">
              <img src="../assets/lang-cn.svg">
              &nbsp;{{$t("header.cn")}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <i class="el-icon-menu dice-menu" @click="mobileShow = !mobileShow"></i>
      </div>
    </div>
    <transition name="el-zoom-in-center">
      <div v-show="mobileShow">
        <!-- <el-button type="text" @click="(window.open('https://jacks.eosdice.vip'))">EOSJACKS</el-button> -->
        <!-- <el-button type="text">历史公告</el-button> -->
        <el-button
          type="text"
          @click="window.open('https://deltadex.io/embed/eosdicevip/bosdicetokem-BOCAI')"
        >{{$t("header.exchange")}}</el-button>
        <el-button type="text" @click="openVip">VIP</el-button>
        <el-button type="text" @click="getfree">获取免费TOKEN</el-button>
        <el-button type="text" @click="roadmapDialog= true">{{$t("header.Roadmap")}}</el-button>
        <el-button type="text" @click="divideDialog = true">{{$t("header.PayoutPool")}}</el-button>
        <el-button type="text" @click="openToken">{{$t("header.tokenDetail")}}</el-button>
        <el-button type="text" @click="openHowto">{{$t("header.howtoplay")}}</el-button>
        <el-button type="text" @click="inviteFriend=true">{{$t("header.Referrals")}}</el-button>
        <el-button type="text" style="margin-left:10px;" @click="openContact">{{$t("header.Social")}}</el-button>
      </div>
    </transition>
    <!-- dialog -->
    <!-- RoadMap 开始 -->
    <el-dialog custom-class="custom-class" :visible.sync="roadmapDialog" class="road-map">
      <h1>{{$t("header.roadTitle")}}</h1>
      <el-steps direction="vertical" :active="1">
        <el-step title="11.22-11.29"><div slot="description">{{$t("header.road1")}}</div></el-step>
        <el-step title="11.29-12.06"><div slot="description">{{$t("header.road2")}}</div>
        </el-step>
        <el-step title="12.06-12.13" process-status="process"> <div slot="description">{{$t("header.road3")}}</div></el-step>
        <el-step title="12.13-12.15" process-status="process"> <div slot="description">{{$t("header.road4")}}</div></el-step>
      </el-steps>
    </el-dialog>
    <!-- RoadMap 结束 -->
    <!-- token 开始-->
    <el-dialog custom-class="custom-class" :visible.sync="tokenDialog">
      <div v-html="$t('header.token')"></div>
    </el-dialog>
    <!-- token 结束 -->

    <!-- 分红池 开始 -->
    <el-dialog custom-class="divide-class" :visible.sync="divideDialog">
      <div class="title">
        <div>
          <h2 :class="{'on-tab': tab1}" @click="tab1=true">{{$t("header.PayoutPool")}}</h2>
        </div>
        <div>
          <h2 :class="{'on-tab': !tab1}" @click="tab1=false">{{$t("header.Stake")}}</h2>
        </div>
      </div>
      <div class="divide" v-show="tab1">
        <h3>{{$t("header.Stake")}}</h3>
        <div class="item">
          <div class="left">
            <img src="../assets/eos.png">
            <p>{{$t("header.currentDividends")}}: {{totalShare}} EOS</p>
          </div>
          <div class="right">
            <div>
              <p>{{$t("header.yourtotalstake")}}</p>
              <p>{{totalout}} EOS</p>
            </div>
            <div>
              <p>{{$t("header.canGet")}}</p>
              <p>{{canGet}} EOS</p>
            </div>
          </div>
        </div>
        <br>
        <div class="item">
          <div class="left">
            <img src="../assets/token.png">
            <p>{{$t("header.allstake")}}:{{stakeRatio}}%</p>
          </div>
          <div class="right">
            <div>
              <p>{{$t("header.currentCirculation")}}</p>
              <p>{{allCirculate}} BOCAI</p>
            </div>
            <div>
              <p>{{$t("header.currentStake")}}</p>
              <p>{{totalStaked}} BOCAI</p>
            </div>
          </div>
        </div>
      </div>
      <div class="stake" v-show="!tab1">
        <div class="my-divide">
          <div class="item-1">
            <div class="title">{{$t("header.myDividend")}}: {{canGet}} EOS</div>
            <el-button type="primary" @click="withdraw">{{$t("header.withdraw")}}</el-button>
          </div>
        </div>
        <div class="stake-content">
          <div class="title">{{$t("header.canstake")}}: {{myBocai}} BOCAI</div>
          <div class="input-content">
            <el-input :placeholder="mostStake" class="dice-input" v-model="stake"></el-input>
            <el-button type="primary" @click="handleStake">{{$t("header.stake1")}}</el-button>
          </div>
        </div>
        <div class="stake-content">
          <div class="title">{{$t("header.staked")}}: {{Number(currentStake).toFixed(4)}}BOCAI</div>
          <div class="input-content">
            <el-input :placeholder="mostRedeem" class="dice-input" v-model="redeem"></el-input>
            <el-button type="primary" @click="handleUnstake">{{$t("header.unstake1")}}</el-button>
          </div>
          <div class="tips">{{$t("header.unstakeMsg")}}</div>
        </div>
      </div>
    </el-dialog>
    <!-- 分红池 结束 -->
    <!-- dialog -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { restApi, eosTransaction, dogetfree } from "@/network/transtion";
import { login } from "@/util/login";
export default {
  name: "diceheader",
  data() {
    return {
      dicelang: window.localStorage.getItem("dicelang")
        ? window.localStorage.getItem("dicelang")
        : "en",
      window: window,
      inviteFriend: false,
      mobileShow: false,
      // dialogs
      tokenDialog: false,
      divideDialog: false,
      roadmapDialog: false,
      // 是否在分红池选项
      tab1: true,
      // 历史总分红
      totalShare: "0.0000",
      // 当前质押
      totalStaked: "0.0000",
      // 每个股份的价格
      earningsPerShare: "0.0000",
      // 已领取分红
      totalout: "0.0000",
      // 已领取分红
      payout: "0.0000",
      // 质押的BOCAI
      currentStake: "0.0000",
      // 当前流通
      allCirculate: "0.0000",
      // 需要减去的流通的BOCAI
      subBocai: 0,
      supply: 8800000000,
      myBocai: "0.0000",
      // 质押
      stake: "",
      redeem: "",
      // 我的累计下注
      myAllbet: '0.0000',
      nextLevel: 1
    };
  },
  watch: {
    divideDialog(newValue) {
      if (newValue) {
        this.updateDivide();
        this.bocaiAmount();
      }
    },
    username(newValue) {
      if(newValue) {
        this.getMyEosBet();
      }
    }
  },
  methods: {
    withdraw() {
      // 提现
      if (this.username) {
        eosTransaction("eosbocaidivi", "claim", {from: this.username}).then(()=> {
          this.$message.success(this.$t("header.Cashwithdrawalsuccess"));
          this.updateDivide();
          this.bocaiAmount();
        }).catch(() => {
          this.$message.error("error...");
        });
      } else {
        this.$message.info(this.$t("header.loginfisrt"));
      }
    },
    handleStake() {
      // 质押
      if(!this.username) {
        this.$message.error(this.$t("header.loginfisrt"));
        return;
      }
      if (this.stake <= this.myBocai) {
        eosTransaction("bosdicetokem", "transfer", {
          from: this.username,
          to: "eosbocaidivi",
          quantity: `${(+this.stake).toFixed(4)} BOCAI`,
          memo: "stake"
        }).then(() => {
          this.updateDivide();
          this.bocaiAmount();
          this.stake = "";
          this.$message.success(this.$t("header.transactionSuccessful"));
        }).catch(() => {
          this.$message.error("error");
        });
      } else {
        this.$message.error(this.$t("header.stakefail"));
      }
    },
    handleUnstake() {
      // 赎回
      if(!this.username) {
        this.$message.error(this.$t("header.loginfisrt"));
        return;
      }
      if (this.redeem <= this.currentStake) {
        eosTransaction("eosbocaidivi", "unstake", {
          from: this.username,
          quantity: `${(+this.redeem).toFixed(4)} BOCAI`,
        }).then(() => {
          this.updateDivide();
          this.bocaiAmount();
          this.$message.success(this.$t("header.transactionSuccessful"));
          this.redeem = "";
        }).catch(()=> {
          this.$message.error("error");
        });
      } else {
        this.$message.error(this.$t("header.unstakefail"));
      }
    },
    updateDivide() {
      restApi
        .getTableRows({
          code: "eosbocaidivi",
          scope: "eosbocaidivi",
          table: "global",
          json: true
        })
        .then(res => {
          if (res.rows && res.rows.length !== 0) {
            this.totalStaked = res.rows[0].total_staked / 10000;
            this.totalShare = res.rows[0].total_share / 10000;
            this.earningsPerShare =
              parseInt(
                res.rows[0].earnings_per_share
                  .substr(2)
                  .match(/.{1,2}/g)
                  .reverse()
                  .join(""),
                16
              ) || 0;
          }
        });
      if (this.username) {
        restApi
          .getTableRows({
            code: "eosbocaidivi",
            scope: this.username,
            table: "voters",
            json: true
          })
          .then(res => {
            if (res.rows && res.rows.length !== 0) {
              this.currentStake = res.rows[0].staked / 10000;
              this.payout = res.rows[0].payout;
              this.totalout = (res.rows[0].totalout / 10000).toFixed(4);
            }
          });
      }
      if (this.subBocai) {
        this.allCirculate = (this.supply - this.subBocai).toFixed(4);
      }
    },
    changeLang(command) {
      this.dicelang = command;
      window.localStorage.setItem("dicelang", command);
      this.$i18n.locale = command;
    },
    login() {
      login(this);
    },
    logout() {
      this.$store.commit("UPDATE_ACCOUNT", {
        account: ""
      });
      scatter.forgetIdentity();
      this.$message.success(this.$t("header.logout"));
    },
    getfree(){
      dogetfree(this);
      this.bocaiAmount();
    }, 
    openVip() {
      this.getMyEosBet();
      this.$msgbox({
        title: " ",
        message: this.$t("header.vipContent", {
          bet: this.myAllbet,
          need: this.nextLevelAmount,
          level: this.nextLevel
        }),
        callback: () => {},
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        showClose: true,
        lockScroll: false,
        customClass: "custom-class"
      });
    },
    openToken() {
      this.tokenDialog = true;
    },
    openHowto() {
      this.$msgbox({
        title: " ",
        message: this.$t("header.howto"),
        callback: () => {},
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        showClose: true,
        lockScroll: false,
        customClass: "custom-class"
      });
    },
    copyLink() {
      const referText = document.getElementById("referId");
      referText.select();
      document.execCommand("copy");
    },
    openContact() {
      this.$msgbox({
        title: " ",
        message: this.$t("header.contact"),
        callback: () => {},
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        showClose: true,
        lockScroll: false,
        customClass: "custom-class"
      });
    },
    // 需要減去的BOCAI
    // getSubCirculate() {
    //   const _this = this;
    //   Promise.all([
    //     restApi.getTableRows({
    //       json: true,
    //       code: "bosdicetokem",
    //       table: "accounts",
    //       scope: "bosdicedevvv"
    //     }),
    //     restApi.getTableRows({
    //       json: true,
    //       code: "bosdicetokem",
    //       table: "accounts",
    //       scope: "bosdiceadmin"
    //     })
    //   ]).then(
    //     ([
    //       bocaiairgrabBalance
    //     ]) => {
    //       let _commBalance = 0;
    //       let _devBalance = 0;
    //       let _bocai2222Balance = 0;
    //       let _jk2uslllkjfdBalance = 0;
    //       let _bocaiairgrabBalance = 0;
    //       if (commBalance.rows.length) {
    //         _commBalance = commBalance.rows[0].balance.split(" ")[0];
    //       }
    //       if (devBalance.rows.length) {
    //         _devBalance = devBalance.rows[0].balance.split(" ")[0];
    //       }
    //       if (bocai2222Balance.rows.length) {
    //         _bocai2222Balance = bocai2222Balance.rows[0].balance.split(" ")[0];
    //       }
    //       if (bocaiairgrabBalance.rows.length) {
    //         _bocaiairgrabBalance = bocaiairgrabBalance.rows[0].balance.split(
    //           " "
    //         )[0];
    //       }
    //       if (jk2uslllkjfdBalance.rows.length) {
    //         _jk2uslllkjfdBalance = jk2uslllkjfdBalance.rows[0].balance.split(
    //           " "
    //         )[0];
    //       }
    //       _this.subBocai =
    //         Number(_commBalance) +
    //         Number(_devBalance) +
    //         Number(_bocai2222Balance) +
    //         Number(_jk2uslllkjfdBalance) +
    //         Number(_bocaiairgrabBalance);
    //     }
    //   );
    // },
    bocaiAmount() {
      const _this = this;
      if (this.username) {
        restApi
          .getTableRows({
            code: "bosdicetokem",
            table: "accounts",
            scope: this.username,
            json: true
          })
          .then(res => {
            res.rows.forEach(item => {
              if (item.balance.split(" ")[1] === "BOCAI") {
                _this.myBocai = item.balance.split(" ")[0];
              }
            });
          });
      }
    },
    getMyEosBet() {
      if (this.username) {
        restApi.getTableRows({
            json: true,
            code: "bosdiceadmin",
            table: "users",
            scope: this.username
          }).then(res => {
            if (res.rows[0]) {
              this.myAllbet = res.rows[0].amount.slice(0, -4);
            }
          });
      }
    }
  },
  computed: {
    ...mapGetters(["username"]),
    myRefer() {
      return "https://eosdice.vip?ref=" + (this.username ? this.username : "");
    },
    canGet() {
      if (this.earningsPerShare && this.currentStake) {
        const get = ((this.earningsPerShare * this.currentStake * 10000) / Math.pow(2, 32) -this.payout) /10000;
        return get < 0 ? "0.0000" : get.toFixed(4);
      } else {
        return "0.0000";
      }
    },
    stakeRatio() {
      return ((this.totalStaked / this.allCirculate) * 100).toFixed(2);
    },
    mostStake() {
      return this.$t("header.maxcanstake")+ `${this.myBocai} BOCAI`;
    },
    mostRedeem() {
      return this.$t("header.maxcanunstake") + `${Number(this.currentStake).toFixed(4)} BOCAI`;
    },
    nextLevelAmount() {
      let amount = 0;
      if (this.myAllbet < 1000) {
        amount = 1000 - this.myAllbet;
        this.nextLevel = 1;
      } else if (this.myAllbet < 5000) {
        amount = 5000 - this.myAllbet;
        this.nextLevel = 2;
      } else if (this.myAllbet < 10000) {
        amount = 10000 - this.myAllbet;
        this.nextLevel = 3;
      } else if (this.myAllbet < 50000) {
        amount = 50000 - this.myAllbet;
        this.nextLevel = 4;
      } else if (this.myAllbet < 100000) {
        amount = 100000 - this.myAllbet;
        this.nextLevel = 5;
      } else if (this.myAllbet < 500000) {
        amount = 500000 - this.myAllbet;
        this.nextLevel = 6;
      } else if (this.myAllbet < 1000000) {
        amount = 1000000 - this.myAllbet;
        this.nextLevel = 7;
      } else if (this.myAllbet < 5000000) {
        amount = 5000000 - this.myAllbet;
        this.nextLevel = 8;
      } else if (this.myAllbet < 10000000) {
        amount = 10000000 - this.myAllbet;
        this.nextLevel = 9;
      } else if (this.myAllbet < 50000000) {
        amount = 50000000 - this.myAllbet;
        this.nextLevel = 10;
      }
      return amount;
    },
  },
  mounted() {
    // this.getSubCirculate();
    restApi
      .getTableRows({
        json: true,
        code: "bosdicetokem",
        table: "stat",
        scope: "BOCAI"
      })
      .then(res => {
        if (res.rows && res.rows.length !== 0) {
          this.supply = res.rows[0].supply.slice(0, -6);
        }
      });
  }
};
</script>

<style lang="less">
.divide-class {
  background: linear-gradient(to bottom right, #5f00ff, #ec6e42) !important;
  // background-color: #861b7f !important;
  color: white !important;
  div {
    color: #fff;
  }
  .title {
    display: flex;
    justify-content: center;
    div {
      flex: auto;
      cursor: pointer;
      // text-align: center;
      display: flex;
      justify-content: center;
      h2 {
        width: fit-content;
        padding: 4px 24px;
        padding-bottom: 10px;
      }
    }
    .on-tab {
      border-bottom: 2px solid #fff;
    }
  }
  .stake {
    .my-divide {
      margin: 0 auto;
      margin-top: 24px;
      width: 90%;
      .item-1 {
        background-image: linear-gradient(-90deg, #7c36d2, #f61c69);
        border-radius: 4px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        padding: 12px 24px;
        justify-content: space-between;
        .title {
          font-weight: 600;
          font-size: 20px;
        }
      }
    }
    .stake-content {
      background: #662199;
      width: 90%;
      margin: 0 auto;
      margin-top: 24px;
      .tips {
        font-weight: 600;
        padding: 14px;
      }
      .title {
        font-weight: 600;
        padding: 12px;
        justify-content: flex-start;
      }
      .input-content {
        display: flex;
        padding: 12px;
        .dice-input {
          margin-right: 24px;
        }
      }
    }
  }
  .divide {
    margin: 0 auto;
    width: 90%;
    margin-top: 12px;
    h3 {
      text-align: left;
      margin-bottom: 12px;
    }
    .item {
      border-radius: 6px;
      background-color: #5c178f;
      overflow: hidden;
      height: 140px;
      display: flex;
      .left {
        width: 50%;
        img {
          width: 48px;
          margin: 12px auto;
        }
        p {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        height: 140px;
      }
      .right {
        width: 50%;
        height: 100%;
        background-color: #8b38af;
        display: inline-block;
        text-align: right;
        padding-right: 12px;
        padding-left: 12px;
        div {
          padding-top: 8px;
          font-weight: 600;
          line-height: 24px;
        }
        div:first-child {
          height: 60px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        }
      }
    }
    // .left {
    //   width: 50%;
    //   display: inline-block;
    //   img {
    //     width: 48px;
    //     margin: 12px auto;
    //   }
    //   p {
    //     font-size: 16px;
    //     font-weight: 600;
    //     margin-bottom: 16px;
    //   }
    // }
    // .right {
    //   width: 50%;
    //   background-color: #8b38af;
    //   height: 100% !important;
    //   flex: auto;
    //   display: flex;
    //   flex-direction: column;
    //   div {
    //     flex: auto;
    //     padding: 10px 10px;
    //     text-align: right;
    //     font-weight: 600;
    //     letter-spacing: .5px;
    //     p {
    //       margin-top: 4px;
    //       margin-bottom: 6px;
    //     }
    //   }
    //   div:first-child {
    //     height: 60px;
    //     border-bottom: 1px solid rgba(0,0,0,.15);
    //   }
    // }
  }
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
  height: 76px;
  line-height: 76px;
  font-size: 18px;
  .right {
    height: 25px;
    line-height: 25px;
    display: flex;
    align-items: center;
    font-size: 18px;
    .el-button--text {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }
    .dice-dropdwon {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
      margin-left: 24px;
    }
  }
}
.logo {
  width: 100px;
  height: 25px;
}
.custom-class {
  background: linear-gradient(to bottom right, #5f00ff, #ec6e42);
  background-color: #861b7f !important;
  border: none !important;
  width: 40% !important;
  color: #fff;
  text-align: left;
}

.vip-content,
.road-map,
.token-intro,
.howto,
.contact {
  .vip-level {
    background-image: linear-gradient(-90deg,#7c36d2,#f61c69);
    border-radius: 10px;
    box-shadow: 0 3px 8px 0 #5c1884;
    margin: 10px 6px;
    padding: 15px 20px;
  }
  color: #fff;
  h1 {
    text-align: center;
    margin-bottom: 8px;
    color: #fff;
  }
  p {
    font-weight: 600;
    letter-spacing: 0.5px;
    font-size: 15px;
  }
  li {
    list-style: none;
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
    .icon {
      display: inline-block;
      background: #f61c69;
      border-radius: 50%;
      height: 24px;
      line-height: 24px;
      margin-right: 8px;
      text-align: center;
      width: 24px;
    }
    .rank {
      display: inline-block;
      width: 200px;
    }
  }
  a {
    color: #0191ee;
    text-decoration: none;
  }
  .con-icon {
    display: flex;
    justify-content: space-between;
    height: 32px;
    margin-top: 24px;
    img {
      width: 32px;
      cursor: pointer;
    }
  }
}

.token-intro {
  p, li {
    margin-bottom: 10px;
  }
  hr {
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
}

.refer-class {
  display: flex;
  input {
    border: none;
    background-color: #1e1e1e;
    color: #dbdbdb;
    font-size: 16px;
    padding: 0 15px;
    flex-grow: 1;
    text-align: left;
    user-select: text;
    cursor: auto;
    &:hover {
      outline: none;
    }
    margin-right: 12px;
  }
}

.dice-menu {
  display: none !important;
}

@media (max-width: 768px) {
  .dice-menu {
    display: block !important;
    margin-left: 6px;
  }
  .mobile-none {
    display: none !important;
  }
  .header {
    padding: 0 6px !important;
    height: 56px;
    line-height: 56px;
  }
  .dice-dropdwon {
    margin-left: 4px !important;
  }
  .logo {
    width: 80px !important;
    height: 20px !important;
  }
  .custom-class {
    width: 90% !important;
  }
  .divide-class {
    width: 90% !important;
  }
}
</style>
