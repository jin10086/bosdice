<template>
  <div class="sidebar">
    <div class="box-table">
      <div class="box-table-total">
        <div @click="showTable=!showTable">
        <p>RUN FOR</p>
        <strong>{{rankAmount}}</strong>
        <em>{{rankEndtime}}</em>
        </div>
        <transition name="el-zoom-in-top">
        <table width="100%" style="text-align: center;" v-show="showTable">
          <thead>
            <tr>
              <th>{{$t("RANK")}}</th>
              <th>{{$t("PLAYER")}}</th>
              <th>{{$t("WAGER")}}</th>
              <th>{{$t("CANGET")}}</th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="(rank, index) in sortedRunData" :key="index" :class="{'td-not-win': index >= 5}">
                <td :class="{'run-rank-1': index === 0}" v-if="index === 0"></td>
                <td :class="{'run-rank-2': index === 1}" v-else-if="index === 1"></td>
                <td :class="{'run-rank-3': index === 2}" v-else-if="index === 2"></td>
                <td :class="{'run-rank-4': index === 3}" v-else-if="index === 3"></td>
                <td :class="{'run-rank-5': index === 4}" v-else-if="index === 4"></td>
                <td v-else>{{index + 1}}</td>
                <td>{{rank.player}}</td>
                <td>{{rank.amount}}</td>
                <td v-if="index === 0">{{(parseFloat(rankAmount.split(' ')[0])*0.45).toFixed(4)}} BOS</td>
                <td  v-else-if="index === 1">{{(parseFloat(rankAmount.split(' ')[0])*0.25).toFixed(4)}} BOS</td>
                <td  v-else-if="index === 2">{{(parseFloat(rankAmount.split(' ')[0])*0.15).toFixed(4)}} BOS</td>
                <td  v-else-if="index === 3">{{(parseFloat(rankAmount.split(' ')[0])*0.10).toFixed(4)}} BOS</td>
                <td  v-else-if="index === 4">{{(parseFloat(rankAmount.split(' ')[0])*0.05).toFixed(4)}} BOS</td>
                <td v-else>0.0000 BOS</td>
              </tr>
            </tbody>
        </table>
        </transition>
        <div>
          <div>{{username ? username : "------"}}</div>
          <div>{{$t("CANGET")}} {{myBet}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { restApi } from "@/network/transtion";
import { handleData } from "@/network/ws.js";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "dice-rich",
  data() {
    return {
      ws_identify: "",
      runData: [],
      sortedRunData1: [],
      my_ws_identify: "",
      myBet: "0.0000 BOS",
      showTable: true,
      rankAmount:"",
      rankEndtime:"59:59"
    };
  },
  computed: {
    ...mapGetters(["username"]),
    sortedRunData() {
      let newArr = [...this.runData];
      return newArr.sort((a, b) => {
        if (a.amount && b.amount) {
          return b.amount.split(" ")[0] - a.amount.split(" ")[0];
        }
        return b.rank_id - a.rank_id;
      });
    },
  },
  watch: {
    username(newValue) {
      restApi.getTableRows({
              code: "bosdiceadmin",
              scope: newValue,
              table: "rankusers",
              json: true
      }).then(res=>{
        if (res.rows.length !== 0){
          this.myBet = res.rows[0].amount;
        }
      })
    },
  },
  methods:{
    getRankList() {
      restApi
        .getTableRows({
          json: true,
          code: "bosdiceadmin",
          table: "rank",
          scope: "bosdiceadmin"
        })
        .then(res => {
          if (res.rows) {
            this.runData = res.rows;
            if (this.runData.length) {
              for (let i = 0; i < this.runData.length; i++) {
                this.getRankItem(this.runData[i].player, i);
              }
            }
          }
        });
    },
    getRankItem(name, index) {
      restApi
        .getTableRows({
          json: true,
          code: "bosdiceadmin",
          table: "rankusers",
          scope: name
        })
        .then(res => {
          if (res.rows && res.rows.length) {
            const amount = res.rows[0].amount;
            const temp = { ...this.runData[index] };
            temp.amount = amount;
            this.$set(this.runData, index, temp);
          }
        });
    },
    getRankGlobal(){
      restApi.getTableRows({
              json: true,
              code: "bosdiceadmin",
              table: "rankglobal",
              scope: "bosdiceadmin"
      }).then(res=>{
          this.$store.state.rankid = res.rows[0].current_id;
          this.$store.state.poolamount = res.rows[0].poolamount;
          this.$store.state.rankendtime = res.rows[0].endtime;
          this.rankAmount = res.rows[0].amount;
          
      })
    },
    getMyBetAmount() {
      const name = this.$store.state.account.name;
      if (name) {
        restApi
          .getTableRows({
            json: true,
            code: "bosdiceadmin",
            table: "rankusers",
            scope: name
          })
          .then(res => {
            if (res.rows && res.rows.length) {
              let current_id = res.rows[0].current_id;
              if (current_id == this.$store.state.rankid) {
                this.myBet = res.rows[0].amount;
              } else {
                this.myBet = "0.0000 EOS";
              }
            }
          });
      }
    },
    calcRankTimer() {
      let current = new Date().getTime();
      let left = this.$store.state.rankendtime * 1000 - current;
      if (left <= 0) {
        this.rankEndtime = "0:00";
        return;
      }
      let duration = moment.duration(left);
      let seconds = duration.seconds() || 0;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.rankEndtime = `${duration.minutes() || 0}:${seconds}`;
    },
  },
  mounted() {
    const width = document.body.clientWidth
    if (width < 768 ) {
      this.showTable = false;
    };
    this.interval = setInterval(() => {
      this.getRankGlobal();
      this.getMyBetAmount();
      this.getRankList();
    }, 5000);
    this.fomoTimer = setInterval(() => {
      this.calcRankTimer();
    }, 1000)    
  },
};
</script>

<style lang="less">
.run-rank-1 {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2MzY2MWY2YS1mNjVjLWM4NDAtYjRiOS00YzhlNDAyN2IxYjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzNGOTRFNzBFNTdFMTFFOEFDRDVBQUFEN0E3NjFDMEEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzNGOTRFNkZFNTdFMTFFOEFDRDVBQUFEN0E3NjFDMEEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZjM0Y2U4N2YtNzE5Yi1lNDQ4LTgyOGQtODBkMjVjMWY4NzY5IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6M2FiNmFiNzYtZTU3ZS0xMWU4LThlZmYt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)
    no-repeat;
  background-position: center center;
  background-size: contain;
  z-index: 1000;
}
.run-rank-2 {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAMFWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjYzNjYxZjZhLWY2NWMtYzg0MC1iNGI5LTRjOGU0MDI3YjFiOSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmZlOGE1NmNhLTI2OTUtZDU0YS04YzZiLTUxZTcyYjFmMmU4ZCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNjMwNjAzNy1lMjk1LTRhM2QtOWU1YS0zZTViYzFjY2ExNWUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTExLTExVDE1OjMzOjU1KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0xMS0xMlQyMDozNjo1MyswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0xMS0xMlQyMDozNjo1MyswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgdGlmZjpPcmllbnRhdGlvbj0iMSIgdGlmZjpYUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOllSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMyIiBleGlmOlBpeGVsWURpbWVuc2lvbj0iMzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MTJlMzRkZC0zYmJiLTQyODYtODEyYS1lYWE2YmY4MWYwMDQiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiZGExNjRhZi02YjA2LTBjNDYtYWQ2OC0xZWE1ODZmNDRhNDYiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2MzY2MWY2YS1mNjVjLWM4NDAtYjRiOS00YzhlNDAyN2IxYjkiLz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NDU2NjVmNTktY2EzYi00NmZiLTlkODktYmVjNWQ4OTJhMmM2IiBzdEV2dDp3aGVuPSIyMDE4LTExLTEyVDE1OjA5OjIzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL3BuZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDE3M2M5MDEtZWNiMi00NTE4LWJiMTAtNTk2MmJmNjhlNjcwIiBzdEV2dDp3aGVuPSIyMDE4LTExLTEyVDE1OjA5OjIzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NzEyZTM0ZGQtM2JiYi00Mjg2LTgxMmEtZWFhNmJmODFmMDA0IiBzdEV2dDp3aGVuPSIyMDE4LTExLTEyVDIwOjM2OjUzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRv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)
    no-repeat;
  background-position: center center;
  background-size: contain;
  z-index: 1000;
}
.run-rank-3 {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGiGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2MzY2MWY2YS1mNjVjLWM4NDAtYjRiOS00YzhlNDAyN2IxYjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTY1MkRGQzhFNTdFMTFFODk5MURCQjA4QTJDM0JGREYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YjQzYmM3ZTYtMTUyNi00NjRmLWIxOGQtNTIzZGIwNWE3MmVhIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTEtMTFUMTU6MzM6NTUrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTExLTEyVDE0OjU1OjUyKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTExLTEyVDE0OjU1OjUyKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZjM0Y2U4N2YtNzE5Yi1lNDQ4LTgyOGQtODBkMjVjMWY4NzY5IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6M2FiNmFiNzYtZTU3ZS0xMWU4LThlZmYtYjNmMjZiOTNhNjI4Ii8+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmI0M2JjN2U2LTE1MjYtNDY0Zi1iMThkLTUyM2RiMDVhNzJlYSIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xMlQxNDo1NTo1MiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iMyIgcGhvdG9zaG9wOkxheWVyVGV4dD0iMyIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Bk2CSgAAB6FJREFUWIWdl21sleUZx3/Xc04PLy3SUgtOfMchSBGpIjCpQ0cVyhJAa3FzGTCWGZfxYZtxxi3g+GC2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)
    no-repeat;
  background-position: center center;
  background-size: contain;
  z-index: 1000;
}
.run-rank-4 {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAALrWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjYzNjYxZjZhLWY2NWMtYzg0MC1iNGI5LTRjOGU0MDI3YjFiOSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjZkOGM4N2VjLTg1ZGEtMjY0Mi05MTBkLTMzNWVjMjAwNzYzNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyZDg5YTAwMy0xYzZlLTQ4MDktOWIzMS05MzE1MDg5MzMwNDEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTExLTExVDE1OjMzOjU1KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0xMS0xMlQyMDozOTo1NiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0xMS0xMlQyMDozOTo1NiswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgdGlmZjpPcmllbnRhdGlvbj0iMSIgdGlmZjpYUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOllSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMyIiBleGlmOlBpeGVsWURpbWVuc2lvbj0iMzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NzkzMmQ2OS0xNDA3LTQ0MTgtYjQ5Yy1hOWZiZjVlOTcwNDMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiZGExNjRhZi02YjA2LTBjNDYtYWQ2OC0xZWE1ODZmNDRhNDYiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2MzY2MWY2YS1mNjVjLWM4NDAtYjRiOS00YzhlNDAyN2IxYjkiLz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NDU2NjVmNTktY2EzYi00NmZiLTlkODktYmVjNWQ4OTJhMmM2IiBzdEV2dDp3aGVuPSIyMDE4LTExLTEyVDE1OjA5OjIzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL3BuZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDE3M2M5MDEtZWNiMi00NTE4LWJiMTAtNTk2MmJmNjhlNjcwIiBzdEV2dDp3aGVuPSIyMDE4LTExLTEyVDE1OjA5OjIzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Njc5MzJkNjktMTQwNy00NDE4LWI0OWMtYTlmYmY1ZTk3MDQzIiBzdEV2dDp3aGVuPSIyMDE4LTExLTEyVDIwOjM4OjA3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjJkODlhMDAzLTFjNmUtNDgwOS05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)
    no-repeat;
  background-position: center center;
  background-size: contain;
  z-index: 1000;
}
.run-rank-5 {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGiGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2MzY2MWY2YS1mNjVjLWM4NDAtYjRiOS00YzhlNDAyN2IxYjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTY1MkRGQzhFNTdFMTFFODk5MURCQjA4QTJDM0JGREYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTY5N2E4YTItNTY2Mi00NmY5LWFlYzYtOWFhYWJiNGE3NTBmIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTEtMTFUMTU6MzM6NTUrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTExLTExVDIzOjI3OjE5KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTExLTExVDIzOjI3OjE5KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZjM0Y2U4N2YtNzE5Yi1lNDQ4LTgyOGQtODBkMjVjMWY4NzY5IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6M2FiNmFiNzYtZTU3ZS0xMWU4LThlZmYtYjNmMjZiOTNhNjI4Ii8+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk2OTdhOGEyLTU2NjItNDZmOS1hZWM2LTlhYWFiYjRhNzUwZiIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xMVQyMzoyNzoxOSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iNSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iNSIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+R19ssAAABxFJREFUWIWdl39sldUZxz/nfS+3l5JKyxT3IzBSiLCFbOp0VgcTWrADIlhrQOxSaDQal3TZ1MT9oZCR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)
    no-repeat;
  background-position: center center;
  background-size: contain;
  z-index: 1000;
}

@media (max-width: 768px) {
  .sidebar {
    width: 90% !important;
    margin: 30px auto !important;
    height: auto !important;
  }
}
.sidebar {
  min-height: 345px;
  padding: 0;
  width: 320px;
  background: #1c233f;
  margin: 30px;
  height: 400px;
  p {
    font-size: 12px;
    color: rgb(219, 219, 219);
    line-height: 16px;
  }
  strong {
    display: block;
    font-size: 21px;
    color: rgb(51, 204, 51);
    text-shadow: rgb(44, 170, 44) 0px 0px 0.2em, rgb(44, 170, 44) 0px 0px 0.2em;
    padding-left: 10px;
    font-family: OpenSansSemiBold;
  }
  p:last-child {
    font-size: 12px;
    color: rgb(127, 127, 127);
    line-height: 16px;
  }
  table {
    margin-top: 8px;
    border-collapse: collapse;
    margin-bottom: 8px;
  }
  thead {
    border-top: 4px solid #284561;
    border-bottom: 4px solid #284561;
    background-color: #161933;
    font-size: 18px;
    line-height: 40px;
    height: 40px;
    text-align: center;
    color: rgb(255, 255, 255);
  }
  tbody {
    height: 220px;
    overflow: hidden;
    // display: block;
  }
  tbody tr {
    font-size: 14px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(40, 40, 40);
    line-height: 22px;
    height: 22px;
    border-bottom: 1px dashed rgb(127, 127, 127);
  }
}
</style>
