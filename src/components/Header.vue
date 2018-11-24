<template>
  <div>
    <div class="language">
      <el-dropdown @command="changeLang">
        <span class="el-dropdown-link">
          <div v-if="dicelang === 'en'"><img src="../assets/lang-en.svg" /> &nbsp;{{$t("header.en")}}<i class="el-icon-arrow-down el-icon--right"></i></div>
          <div v-if="dicelang === 'cn'"><img src="../assets/lang-cn.svg" /> &nbsp;{{$t("header.cn")}}<i class="el-icon-arrow-down el-icon--right"></i></div>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="en"><img src="../assets/lang-en.svg" /> &nbsp;{{$t("header.en")}}</el-dropdown-item>
          <el-dropdown-item command="cn"><img src="../assets/lang-cn.svg" /> &nbsp;{{$t("header.cn")}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "diceheader",
  data() {
    return {
      dicelang: "en"
    };
  },
  methods: {
    changeLang(command) {
      this.dicelang = command;
      window.localStorage.setItem("dicelang", command);
      this.$i18n.locale = command;
    }
  }
};
</script>

<style lang="less">
.language {
  cursor: pointer;
}
</style>
