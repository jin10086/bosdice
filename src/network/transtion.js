import store from "../store";
import Eos from "eosjs";

export const network = {
  blockchain: "eos",
  host: "api1.eosasia.one",
  port: 443,
  protocol: "https",
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
}

export const restApi = Eos({
  httpEndpoint: `${network.protocol}://${network.host}:${network.port}`,
  chainId: network.chainId
})

function handleError(errmsg) {
  let e = JSON.stringify(errmsg);
  if ("string" === typeof e) {
    if (e.includes("unsatisfied_authorization"))
      // return this.$t("apiErrors.unsatisfiedAuthorization", {
      //   accountName: this.account.name,
      //   permission: this.account.authority
      // });
      return "未授权";
    if (e.includes("overdrawn balance"))
      // return this.$t("apiErrors.overdrawnBalance", {
      //   EOS_CORE_SYMBOL: Number(this.eos).toFixed(4) + " EOS"
      // });
      return "余额不足";
    if (e.includes("ram_usage_exceeded"))
      // return this.$t("apiErrors.ramUsageExceeded");
      return "ram不足";
    if (e.includes("Time is up")) return this.$t("sellTokenEnd");
    if (e.includes("referrer account does not exist"))
      // return this.$t("refererNotExist");
      return "不存在推荐者";
    if (e.includes("start at utc+8 2018-10-30 21:00:00"))
      return "不存在推荐者";
      // return this.$t("playDiceAt");
    if (e.includes("start at utc+8 2018-10-29 21:00:00"))
      // return this.$t("buytokenAt");
      return "不存在推荐者";
    if (e.includes("signature_rejected"))
      // return this.$t("apiErrors.signature_rejected");
      return "不存在推荐者";
    if (e.includes("leeway_deadline_exception"))
      // return this.$t("apiErrors.cpuUsageExceeded");
      return "不存在推荐者";
    if (e.includes("tx_net_usage_exceeded"))
      // return this.$t("apiErrors.netUsageExceeded");
      return "不存在推荐者";
    if (
      e.includes("deadline_exception") ||
      e.includes("tx_cpu_usage_exceeded")
    )
      // return this.$t("apiErrors.deadlineExceeded");
      return "不存在推荐者";
    try {
      e = JSON.parse(e);
    } catch (e) { }
  }
  return "未知错误";
    // this.$t("apiErrors.unexpectedError") + "\n" + JSON.stringify(e, null)
    // return "不存在推荐者";
}

// 添加币种图片，src为base64
export const supportCoin = {
  eos: {
    contract: "eosio.token",
    symbol: "EOS",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAVCAYAAAB2Wd+JAAABYUlEQVQ4jX3UP2sVQRSG8d9dCGpKGwOCCBkQFBWMCfcT2KWwiJaCYKVfwDK1jWipWIrc2BiwUhs/gCCmm9MGxUbs7MYic2VcZu+Bhd2Z8+z77J8ZpRS9I+e8MTVXSjHoVESs41NE3O/Now/iKS7jWURc6jXMSinjtD0smqGvmKeU/kwmRsRFvBjd/DqeTCZGxBo+Y94xK7idUnrXS3w0AcEMryLidA/ME9CyjtvnHKrmOXzA7xXgIiI2xom7uILDFeAB9sfgTYw/Q1vf8AP3IuJ8C25XcEp3Ua1O1V5DRJzBVWyu0D3AncbOgGtYq4M93aXmrXq9swS3m6aebqsJWxExG4Ob1aDVbTXhLNKwjG7qbqM71lzW1oA3aP/8PXysumNN+IKjIaW07+Rtvq8TF5ysiMOR5i88xE5K6ei/9RgRu3iOt3iJ71X1NR6nlH7+a+7sNes55wf1/EbOed7bc/4CUTq6he/WHK4AAAAASUVORK5CYII=",
    minAmount: 0.5
  },
  bocai: {
    contract: "eosbocai1111",
    symbol: "BOCAI",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAYAAAA5Od+KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2OWY0YmM0YS0yNTYyLTRiNmMtYjk2MS0xNmI1M2Y1MjU3NzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0QzOEM0NzVENTIzMTFFOEI1MjZBODIzRTY0MTVERTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0QzOEM0NzRENTIzMTFFOEI1MjZBODIzRTY0MTVERTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OWY0YmM0YS0yNTYyLTRiNmMtYjk2MS0xNmI1M2Y1MjU3NzciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjlmNGJjNGEtMjU2Mi00YjZjLWI5NjEtMTZiNTNmNTI1Nzc3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",
    minAmount: 1000
  },
  jacks: {
    contract: "eosbocai1111",
    symbol: "JACKS",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd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",
    minAmount: 1000
  }
}

export function eosTransaction(account, name, data) {
  if(scatter) {
    return new Promise((resolve, reject) => {
      const eos = scatter.eos(network, Eos, {});
      eos.transaction({
        actions: [{
          // 合约账户
          account: account,
          // 交易类型
          name: name,
          authorization: [{
            actor: store.state.account.name,
            permission: store.state.account.authority
          }],
          data: data
        }]
      }).then(() => {
        resolve("success");
      }).catch(() => {
        reject("error");
      });
    });
  }
}

export function api(coinType, action, data, vm) {
  // coinType 表示 押注使用的代币
  vm.$message.info("等待交易确认");
  if (data.quantity) {
    data.quantity = Number(data.quantity).toFixed(4) + " " + supportCoin[coinType].symbol;
    if (data.quantity < supportCoin[coinType].minAmount) {
      vm.$message(`交易金额不能小于${supportCoin[coinType].minAmount} ${supportCoin[coinType].symbol}`)
      return;
    }
  }
  if (scatter) {
    const eos = scatter.eos(network, Eos, {});
    eos.transaction({
      actions: [{
        // 合约账户
        account: supportCoin[coinType].contract,
        // 交易类型
        name: action,
        authorization: [{
          actor: store.state.account.name,
          permission: store.state.account.authority
        }],
        data: data
      }]
    }).then(() => {
      vm.$message.success("交易成功，等待结果");
      vm.$store.dispatch("UPDATE_EOS_ASYNC");
      vm.$store.dispatch("UPDATE_TOKEN_ASYNC", {
        type: coinType === "eos" ? "bocai" : coinType
      });
    }).catch((err) => {
      console.log(err, 'rr');
      vm.$message.error(handleError(err));
    })
  }
}