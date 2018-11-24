<template>
<div>
  <div class="header">
    <img src="../assets/eosdice.png" class="logo"/>
    <div class="right">
      <div class="mobile-none">
        <el-button type="text" @click="(window.open('https://jacks.eosdice.vip'))">EOSJACKS</el-button>
        <el-button type="text">历史公告</el-button>
        <el-button type="text" @click="window.open('https://deltadex.io/embed/eosdicevip/eosbocai1111-BOCAI')">交易BOCAI</el-button>
        <el-button type="text" @click="openVip">VIP</el-button>
        <el-button type="text" @click="openRoadMap">Road Map</el-button>
        <el-button type="text">分红池</el-button>
        <el-button type="text" @click="openToken">TOKEN介绍</el-button>
        <el-button type="text" @click="openHowto">玩法介绍</el-button>
        <el-button type="text" @click="inviteFriend=true">邀请好友</el-button>
        <el-button type="text" style="margin: 0 10px;" @click="openContact">联系我们</el-button>
      </div>
      <el-button type="text">
        <span v-if="username" @click="logout">{{username}}<i class="el-icon-caret-bottom"></i></span>
        <span v-else @click="login">登录</span>
      </el-button>
      <el-dialog :visible.sync="inviteFriend" custom-class="custom-class">
        <h3 slot="title">通过邀请获得返利!</h3>
        <div class="refer-class">
          <input v-model="myRefer" id="referId"/>
          <el-button type="primary" @click="copyLink">复制</el-button>
        </div>
        <h3 style="color:#fff; text-align:left; margin-top:10px">请勿错过！邀请好友即可获得他们 0.151% 的投注额</h3>
      </el-dialog>
      <el-dropdown @command="changeLang" class="dice-dropdwon">
        <span class="el-dropdown-link">
          <div v-if="dicelang === 'en'"><img src="../assets/lang-en.svg" /> &nbsp;{{$t("header.en")}}<i class="el-icon-arrow-down el-icon--right"></i></div>
          <div v-if="dicelang === 'cn'"><img src="../assets/lang-cn.svg" /> &nbsp;{{$t("header.cn")}}<i class="el-icon-arrow-down el-icon--right"></i></div>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="en"><img src="../assets/lang-en.svg" /> &nbsp;{{$t("header.en")}}</el-dropdown-item>
          <el-dropdown-item command="cn"><img src="../assets/lang-cn.svg" /> &nbsp;{{$t("header.cn")}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i class="el-icon-menu dice-menu" @click="mobileShow = !mobileShow"></i>
    </div>
  </div>
  <transition>
    <div v-show="mobileShow">
      <el-button type="text" @click="(window.open('https://jacks.eosdice.vip'))">EOSJACKS</el-button>
      <el-button type="text">历史公告</el-button>
      <el-button type="text" @click="window.open('https://deltadex.io/embed/eosdicevip/eosbocai1111-BOCAI')">交易BOCAI</el-button>
      <el-button type="text" @click="openVip">VIP</el-button>
      <el-button type="text" @click="openRoadMap">Road Map</el-button>
      <el-button type="text">分红池</el-button>
      <el-button type="text" @click="openToken">TOKEN介绍</el-button>
      <el-button type="text" @click="openHowto">玩法介绍</el-button>
      <el-button type="text" @click="inviteFriend=true">邀请好友</el-button>
      <el-button type="text" style="margin-left:10px;" @click="openContact">联系我们</el-button>
    </div>
  </transition>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { login } from "@/util/login";
export default {
  name: "diceheader",
  data() {
    return {
      dicelang: window.localStorage.getItem("dicelang") ? window.localStorage.getItem("dicelang"): "en",
      window: window,
      inviteFriend: false,
      mobileShow: false
    };
  },
  methods: {
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
        title: ' ',
        message: this.$t("header.vipConetent"),
        callback: () => {},
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        showClose: true,
        lockScroll: false,
        customClass: "custom-class"
      })
    },
    openRoadMap() {
      this.$msgbox({
        title: ' ',
        message: this.$t("header.roadMap"),
        callback: () => {},
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        showClose: true,
        lockScroll: false,
        customClass: "custom-class"
      })
    },
    openToken() {
      this.$msgbox({
        title: ' ',
        message: this.$t("header.token"),
        callback: () => {},
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        showClose: true,
        lockScroll: false,
        customClass: "custom-class"
      })
    },
    openHowto() {
      this.$msgbox({
        title: ' ',
        message: this.$t("header.howto"),
        callback: () => {},
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        showClose: true,
        lockScroll: false,
        customClass: "custom-class"
      })
    },
    copyLink() {
      const referText = document.getElementById("referId");
      referText.select();
      document.execCommand("copy");
    },
    openContact() {
      this.$msgbox({
        title: ' ',
        message: this.$t("header.contact"),
        callback: () => {},
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        showClose: true,
        lockScroll: false,
        customClass: "custom-class"
      })
    }
  },
  computed: {
    ...mapGetters(["username"]),
    myRefer() {
      return "https://eosdice.vip?ref=" + (this.username ? this.username : "");
    }
  }
};
</script>

<style lang="less">
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
  background: linear-gradient(to bottom right,#5f00ff,#ec6e42);
  background-color: #861b7f !important;
  border: none !important;
  width: 40% !important;
  color: #fff;
}
.vip-content, .road-map, .token-intro, .howto, .contact {
  color: #fff;
  h1 {
    text-align: center;
    margin-bottom: 8px;
  }
  p {
    font-weight: 600;
    letter-spacing: .5px;
    font-size: 15px;
  }
  li {
    list-style: none;
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: .5px;
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
    margin-right: 24px;
  }
}

.dice-menu {
  display: none !important;
}

@media (max-width:768px) {
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
    margin-left: 4px!important;
  }
  .logo {
    width: 80px !important;
    height: 20px !important;
  }
}
</style>
