<template>
  <div class="middle">
    <div class="panel-wrap">
      <div class="top">#{{diceJson ? (diceJson.current_id-1) : 0}}:Won {{diceJson ? diceJson.lastWinnerAmout : "0 EOS"}} with {{diceJson ? diceJson.lastWinnerToken: "0 BOCAI"}}
        <div class="top-top">Last Win: {{diceJson ? diceJson.lastWinnerPlayer : ''}}</div>
      </div>
      <div class="round">
        <span>{{$t('auction.round')}}#{{diceJson.current_id}}</span>
        <span>?</span>
      </div>
      <div class="round-title">
        <div>ARENA</div>
        <div class="blue-font">{{diceJson.lastamout}} = {{diceJson.amount}}</div>
      </div>
      <div class="end-time">
        <div class="end-time-title">{{$t('auction.endIn')}}</div>
        <div class="end-time-time">{{diceEndtime}}</div>
      </div>
      <div class="end-bid">
        <div class="end-bid-title">{{$t('auction.last')}}</div>
        <div class="end-bid-content">
          {{diceJson.lastPlayer}}
        </div>
      </div>
      <div class="end-form">
        <div class="end-form-title">{{$t('auction.placeBid')}}</div>
        <div class="end-form-form">
          <i class="icon-cap"></i>
          <input type="text" autocomplete="off" class="end-form-input" v-model="diceinputAmount"/>
          <div class="end-form-pei">
            <span @click="addDice(1.1)">+10%</span>
            <span @click="addDice(1.2)">+20%</span>
            <span @click="addDice(1.3)">+30%</span>
          </div>
        </div>
      </div>
      <div class="login-btn">
        <span v-if="!username" @click="login">{{$t('auction.login')}}</span>
        <span v-else @click="bid">{{$t('auction.bid')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { handleData } from "@/network/ws.js";
import { login } from "@/util/login";
import { api } from "@/network/transtion";
export default {
  name: "dice-auction",
  data() {
    return {
      diceinputAmount: 10,
      diceEndtime: "05:00",
      ws_identify: "",
      diceJson: ''
    };
  },
  computed: {
    ...mapGetters(["username"])
  },
  methods: {
    countDown() {
      let current = new Date().getTime();
      let left = this.diceJson.endtime * 1000 - current;
      if (left <= 0) {
        this.diceEndtime = "等待下一局开始";
        return;
      }
      left /= 1000;
      const min = '0' + Math.floor(left / 60);
      let sec = Math.floor(left % 60);
      if (sec < 10) {
        sec = '0' + sec;
      }
      this.jkrEndtime = `${ min }:${ sec }`;
    },
    addDice(number) {
      this.diceinputAmount = Math.floor(this.diceinputAmount * Number(number));
    },
    login() {
      login(this);
    },
    bid() {
      api("bocai", "transfer", {
        from: this.$store.state.account.name,
        to: "eosbocaijack",
        quantity: this.diceinputAmount,
        memo: "auctionjkr"
      }, this);
    }
  },
  mounted() {
    const that = this;
    setInterval(() => {
      that.countDown()
    }, 1000);
    this.ws_identify = this.$ws.getTableRows(
      {
        code: "eosbocaijack",
        scope: "eosbocaijack",
        table: "jks",
        json: true
      },
      { req_id: "dice-auction" , fetch: true}
    );
    this.ws_identify.onMessage(message => {
      const mes = handleData(message);
      if (mes) {
        that.diceJson = mes;
      }
      console.log(mes, 11)
    });
  },

  destroyed() {
    this.ws_identify.unlisten();
  }
};
</script>

<style lang="less">
.middle {
  width: 320px;
  padding-top: 56px;
  margin: 30px;
  .panel-wrap {
    background-color: #161933;
    padding-bottom: 24px;
    box-shadow: 7.5px 12.99px 27px 0 rgba(34, 35, 40, 0.1);
    position: relative;
    .top {
      position: absolute;
      top: -26px;
      height: 26px;
      line-height: 26px;
      color: #8b8b8b;
      background-color: #1c233f;
      width: 100%;
      padding: 0;
      border-top: 2px solid #3c3;
      padding-left: 10px;
      font-size: 12px;
      font-weight: 400;
      text-align: left;
      .top-top {
        position: absolute;
        top: -26px;
        text-align: center;
        width: 100%;
        left: 0;
        font-size: 18px;
        font-weight: 700;
        color: #3c3;
        font-style: italic;
      }
    }
    .round {
      font-size: 12px;
      font-weight: 700;
      color: #8b8b8b;
      padding: 8px 8px 0;
      display: flex;
      justify-content: space-between;
    }
    .round-title {
      font-size: 28px;
      font-weight: 700;
      color: rgb(219, 219, 219);
    }
    .end-time {
      padding-top: 10px;
      &-title {
        color: #7f7f7f;
        font-size: 12px;
      }
      &-time {
        color: #dbdbdb;
        font-size: 18px;
        font-weight: 700;
      }
    }
    .end-bid {
      padding-top: 10px;
      &-title {
        font-size: 12px;
        font-weight: 400;
        color: rgb(127, 127, 127);
      }
      &-content {
        margin: 5px 15px 0;
        font-weight: 700px;
      }
    }
    .login-btn {
      padding: 15px 15px 0 18px;
      width: 100%;
      height: 48px;
      span {
        line-height: 32px;
        font-size: 18px;
        font-weight: 700;
        background-color: #28b6e4;
        // box-shadow: 0 0 27px 0 rgba(51, 204, 51, 0.5);
        display: inline-block;
        width: 100%;
        cursor: pointer;
      }
    }
  }
}
.blue-font {
  font-size: 18px;
  font-weight: 700;
  color: #3c3;
  text-shadow: 0 0 0.2em #2caa2c, 0 0 0.2em #2caa2c;
  line-height: 28px;
}
.end-form {
  &-title {
    text-align: center;
    color: #7f7f7f;
    font-size: 12px;
    display: block;
    padding-top: 8px;
  }
  &-form {
    margin: 5px 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1e1e1e;
    i {
      margin-left: 10px;
      margin-top: 6px;
      margin-right: 6px;
      display: block;
      width: 20px;
      height: 20px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHcGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTAtMjJUMTQ6MTQ6MjIrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTExLTA2VDIzOjI3OjA4KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTExLTA2VDIzOjI3OjA4KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmY1YzQwYTEwLTQ0MWQtNDQwMC1hMjQyLWZhYWUzOThlYzcwYiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmE4OWJkNzI1LTI5MTUtODg0Zi1hOTA0LTI2ZDkxOTAzM2JjOCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmU3YTUwMTAzLWQ1NWMtNDJjZC1iZTRmLTUzZjU5ZjJjYzRmOCI+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1YTVhMmJhMC1kNTYwLTExZTgtYmM4NC1mZjY0OWE3NzdiYzI8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplN2E1MDEwMy1kNTVjLTQyY2QtYmU0Zi01M2Y1OWYyY2M0ZjgiIHN0RXZ0OndoZW49IjIwMTgtMTAtMjJUMTQ6MTQ6MjIrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNGMyNzM5ZC1lNWU2LTQ3NGYtOGVjZC03ZTlkZTUzMTAzMDIiIHN0RXZ0OndoZW49IjIwMTgtMTEtMDZUMjM6Mjc6MDgrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmNWM0MGExMC00NDFkLTQ0MDAtYTI0Mi1mYWFlMzk4ZWM3MGIiIHN0RXZ0OndoZW49IjIwMTgtMTEtMDZUMjM6Mjc6MDgrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnRFxHYAAAJ8SURBVDiNbdRfaJZ1FAfwz/tsrWaL1iaM2VizXTgqdIo05r9Yf1heGEEIdpEIdRGp6G3hH7wSrKvAK1ERFCSiEQpBRjW7WCVFid70qqS1+WeLSlJizl4vznnN4fODh/d5zvs733PO93vOqVSrVSWnAR1YiB8xhFv4GivwBW6WOTaW2LqwBS/iUWzCIB7O7x34FUdxIAOVAjbgFWzEMjSn/Q3cRgs2oCefXizFPnxfBlhgNV7I7xF8h2u4nAG703kVnsVbeec+wGfQms8UPsKFdBwQfMI5wd/H+ANL8FT6X8VkHXAIT6MtwSbxgdmnhvl4O4Nuw0QGhSOYLPAQ9grS/8RF7CwBO4tj+A9z8R6uYFyI9BMqBV5PvobxLV5y/5nCaILW0taV7xewKzG6C6HUcGZ3Bn0JfArn8Q+24yTeEeIQIg5khq11PhvRiQfxe2ZS4Ku8vAdN+BRP4nOheqdQvEWIM40H0NGYnEhDgUfQjwUZfSz/v4R3RXNvwL94LH2ggttFEjqVUTuTl9V4HOvRng5/Z4BhrMViIUpbVvEXxovM4HAaF+FEAtSSz97MpE3M8VbME212McW5JvrzTKVardbLPCRa6ATezxKmU5xxMQTzk44KfsCXWInj2I1akRyuwTe4LjbM5uSoCcvxGl7NMiui5/YnHZfF5ulDrT4pY6JZV+HlBNoplBzI3xnRh6OZ7Xoh3CF8ksncneXzSfBvWf46PCH6cUSMWEPaevF8vs/gdHLpXkC4IXZcO54TO3AQn+W9FrHS+vP+6Qw2eg+GSsnGbsabyVm72IdrMEc0/If4GQeFsrNOGWD9NGV5E2KsZsTe68Ev/p/pWecOLICiauke0C8AAAAASUVORK5CYII=)
        0 0 no-repeat;
    }
    .icon-key {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAABQUlEQVQ4ja3Uv0vVURjH8de9XiKUBnONWh5cJJAWqZwbKmwQHF1VEOyPyaWlya2iKWmxHxAUbS6CPuLu0OiQ5HW43xvfrvd7v98bfeDA4fMc3udzngdOq9vtaqLMvI4l3McUTvAmIg77Z1pNYJm5iB3cHihd4CW2IuJXpwFoAR8wOaTcxjpmsDIyWWa2sY+5kv0ba/iE59gs/OU62AN8HbB3I+JxUe/gFNPYbVeSepof4t3KzIlif1NvGHCvrmfDLruL95m5h1VcK/yJOthRhf+oWGUdVD4zM1t4VnNZWTtDB1CAtrHREPQDD68k+wfQFzyJiPO/elYDOsMrzOIGjvEW7yLiAv7AGoCeRsTHURHb/wsEnRGgF0h8i4jvdSB6z7xTkeh1RHxuAinDBtVPlOOAqmBjJyrDfup9JX2NnaivS3fJba/S3MCWAAAAAElFTkSuQmCC) !important;
    }
  }
  .end-form-key {
    width: 322px;
  }
  &-input {
    background: #1e1e1e;
    color: #fff;
    font-size: 16px;
    height: 32px;
    width: 94px;
    line-height: 32px;
    outline: none;
    border: none;
    cursor: auto;
  }
  &-pei {
    flex: 2;
    display: flex;
    span {
      flex: 2;
      line-height: 32px;
      color: #7f7f7f;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    background-color: rgb(40, 40, 40);
  }
}
</style>
