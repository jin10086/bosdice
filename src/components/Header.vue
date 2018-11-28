<template>
  <div>
    <div class="header">
      <img src="../assets/eosdice.png" class="logo">
      <div class="right">
        <div class="mobile-none">
          <!-- <el-button type="text" @click="(window.open('https://jacks.eosdice.vip'))">EOSJACKS</el-button> -->
          <!-- <el-button type="text">历史公告</el-button> -->
          <el-button
            type="text"
            @click="window.open('https://deltadex.io/embed/eosdicevip/eosbocai1111-BOCAI', '_self')"
          >交易BOCAI</el-button>
          <el-button type="text" @click="openVip">VIP</el-button>
          <el-button type="text" @click="openRoadMap">Road Map</el-button>
          <el-button type="text" @click="divideDialog = true">分红池</el-button>
          <el-button type="text" @click="openToken">TOKEN介绍</el-button>
          <el-button type="text" @click="openHowto">玩法介绍</el-button>
          <el-button type="text" @click="inviteFriend=true">邀请好友</el-button>
          <el-button type="text" style="margin: 0 10px;" @click="openContact">联系我们</el-button>
        </div>
        <el-button type="text">
          <span v-if="username" @click="logout">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <span v-else @click="login">登录</span>
        </el-button>
        <el-dialog :visible.sync="inviteFriend" custom-class="custom-class">
          <h3 slot="title">通过邀请获得返利!</h3>
          <div class="refer-class">
            <input v-model="myRefer" id="referId">
            <el-button type="primary" @click="copyLink">复制</el-button>
          </div>
          <h3 style="color:#fff; text-align:left; margin-top:10px">请勿错过！邀请好友即可获得他们 0.151% 的投注额</h3>
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
          @click="window.open('https://deltadex.io/embed/eosdicevip/eosbocai1111-BOCAI')"
        >交易BOCAI</el-button>
        <el-button type="text" @click="openVip">VIP</el-button>
        <el-button type="text" @click="openRoadMap">Road Map</el-button>
        <el-button type="text" @click="divideDialog = true">分红池</el-button>
        <el-button type="text" @click="openToken">TOKEN介绍</el-button>
        <el-button type="text" @click="openHowto">玩法介绍</el-button>
        <el-button type="text" @click="inviteFriend=true">邀请好友</el-button>
        <el-button type="text" style="margin-left:10px;" @click="openContact">联系我们</el-button>
      </div>
    </transition>
    <!-- dialog -->
    <!-- token 开始-->
    <el-dialog custom-class="custom-class" :visible.sync="tokenDialog">
      <div v-html="$t('header.token')"></div>
    </el-dialog>
    <!-- token 结束 -->
    <!-- 分红池 开始 -->
    <el-dialog custom-class="divide-class" :visible.sync="divideDialog">
      <div class="title">
        <div>
          <h2 :class="{'on-tab': tab1}" @click="tab1=true">分红池</h2>
        </div>
        <div>
          <h2 :class="{'on-tab': !tab1}" @click="tab1=false">质押与分红</h2>
        </div>
      </div>
      <div class="divide" v-show="tab1">
        <h3>质押与分红</h3>
        <div class="item">
          <div class="left">
            <img src="../assets/eos.png">
            <p>历史总分红: {{totalShare}} EOS</p>
          </div>
          <div class="right">
            <div>
              <p>你一共领取了</p>
              <p>{{totalout}} EOS</p>
            </div>
            <div>
              <p>可以领取分红</p>
              <p>{{canGet}} EOS</p>
            </div>
          </div>
        </div>
        <br>
        <div class="item">
          <div class="left">
            <img src="../assets/token.png">
            <p>全网质押比:{{stakeRatio}}%</p>
          </div>
          <div class="right">
            <div>
              <p>当前流通</p>
              <p>{{allCirculate}} BOCAI</p>
            </div>
            <div>
              <p>当前质押</p>
              <p>{{totalStaked}} BOCAI</p>
            </div>
          </div>
        </div>
      </div>
      <div class="stake" v-show="!tab1">
        <div class="my-divide">
          <div class="item-1">
            <div class="title">我的分红: {{canGet}} EOS</div>
            <el-button type="primary" @click="withdraw">提现</el-button>
          </div>
        </div>
        <div class="stake-content">
          <div class="title">可质押: {{myBocai}} BOCAI</div>
          <div class="input-content">
            <el-input :placeholder="mostStake" class="dice-input" v-model="stake"></el-input>
            <el-button type="primary" @click="handleStake">质押</el-button>
          </div>
        </div>
        <div class="stake-content">
          <div class="title">已质押: {{Number(currentStake).toFixed(4)}}BOCAI</div>
          <div class="input-content">
            <el-input :placeholder="mostRedeem" class="dice-input" v-model="redeem"></el-input>
            <el-button type="primary" @click="handleUnstake">赎回</el-button>
          </div>
          <div class="tips">赎回需24小时，赎回中的BOCAI不享受分红</div>
        </div>
      </div>
    </el-dialog>
    <!-- 分红池 结束 -->
    <!-- dialog -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { restApi, eosTransaction } from "@/network/transtion";
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
      redeem: ""
    };
  },
  watch: {
    divideDialog(newValue) {
      if (newValue) {
        this.updateDivide();
        this.bocaiAmount();
      }
    }
  },
  methods: {
    withdraw() {
      // 提现
      if (this.username) {
        eosTransaction("eosbocaidivi", "claim", {from: this.username}).then(()=> {
          this.$message.success("提现成功");
          this.updateDivide();
          this.bocaiAmount();
        }).catch(() => {
          this.$message.error("发生错误");
        });
      } else {
        this.$message.info("请先登录");
      }
    },
    handleStake() {
      // 质押
      if(!this.username) {
        this.$message.error(`请先登录`);
        return;
      }
      if (this.stake <= this.myBocai) {
        eosTransaction("eosbocai1111", "transfer", {
          from: this.username,
          to: "eosbocaidivi",
          quantity: `${(+this.stake).toFixed(4)} BOCAI`,
          memo: "stake"
        }).then(() => {
          this.updateDivide();
          this.bocaiAmount();
          this.stake = "";
          this.$message.success("交易成功");
        }).catch(() => {
          this.$message.error("发生错误");
        });
      } else {
        this.$message.error(`质押不能超过当前BOCAI余额`);
      }
    },
    handleUnstake() {
      // 赎回
      if(!this.username) {
        this.$message.error(`请先登录`);
        return;
      }
      if (this.redeem <= this.currentStake) {
        eosTransaction("eosbocaidivi", "unstake", {
          from: this.username,
          quantity: `${(+this.redeem).toFixed(4)} BOCAI`,
        }).then(() => {
          this.updateDivide();
          this.bocaiAmount();
          this.$message.success("交易成功");
          this.redeem = "";
        }).catch(()=> {
          this.$message.error("发生错误");
        });
      } else {
        this.$message.error(`赎回不能超过当前质押BOCAI总数`);
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
            console.log(res, "voters");
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
      this.$message.success("登出成功");
    },
    openVip() {
      this.$msgbox({
        title: " ",
        message: this.$t("header.vipConetent"),
        callback: () => {},
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        showClose: true,
        lockScroll: false,
        customClass: "custom-class"
      });
    },
    openRoadMap() {
      this.$msgbox({
        title: " ",
        message: this.$t("header.roadMap"),
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
    getSubCirculate() {
      const _this = this;
      Promise.all([
        restApi.getTableRows({
          json: true,
          code: "eosbocai1111",
          table: "accounts",
          scope: "eosbocaicomm"
        }),
        restApi.getTableRows({
          json: true,
          code: "eosbocai1111",
          table: "accounts",
          scope: "eosbocaidevv"
        }),
        restApi.getTableRows({
          json: true,
          code: "eosbocai1111",
          table: "accounts",
          scope: "bocai.game"
        }),
        restApi.getTableRows({
          json: true,
          code: "eosbocai1111",
          table: "accounts",
          scope: "jk2uslllkjfd"
        }),
        restApi.getTableRows({
          json: true,
          code: "eosbocai1111",
          table: "accounts",
          scope: "bocaiairgrab"
        })
      ]).then(
        ([
          commBalance,
          devBalance,
          bocai2222Balance,
          jk2uslllkjfdBalance,
          bocaiairgrabBalance
        ]) => {
          let _commBalance = 0;
          let _devBalance = 0;
          let _bocai2222Balance = 0;
          let _jk2uslllkjfdBalance = 0;
          let _bocaiairgrabBalance = 0;
          if (commBalance.rows.length) {
            _commBalance = commBalance.rows[0].balance.split(" ")[0];
          }
          if (devBalance.rows.length) {
            _devBalance = devBalance.rows[0].balance.split(" ")[0];
          }
          if (bocai2222Balance.rows.length) {
            _bocai2222Balance = bocai2222Balance.rows[0].balance.split(" ")[0];
          }
          if (bocaiairgrabBalance.rows.length) {
            _bocaiairgrabBalance = bocaiairgrabBalance.rows[0].balance.split(
              " "
            )[0];
          }
          if (jk2uslllkjfdBalance.rows.length) {
            _jk2uslllkjfdBalance = jk2uslllkjfdBalance.rows[0].balance.split(
              " "
            )[0];
          }
          _this.subBocai =
            Number(_commBalance) +
            Number(_devBalance) +
            Number(_bocai2222Balance) +
            Number(_jk2uslllkjfdBalance) +
            Number(_bocaiairgrabBalance);
        }
      );
    },
    bocaiAmount() {
      const _this = this;
      if (this.username) {
        restApi
          .getTableRows({
            code: "eosbocai1111",
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
      return `最多可质押${this.myBocai}BOCAI`;
    },
    mostRedeem() {
      return `最多可赎回${Number(this.currentStake).toFixed(4)}BOCAI`;
    }
  },
  mounted() {
    this.getSubCirculate();
    restApi
      .getTableRows({
        json: true,
        code: "eosbocai1111",
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
  color: #fff;
  h1 {
    text-align: center;
    margin-bottom: 8px;
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
