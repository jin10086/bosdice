import store from "../store";
import Eos from "eosjs";

export const network = {
  blockchain: "eos",
  host: "hapi.bos.eosrio.io",
  port: 443,
  protocol: "https",
  chainId: "d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86"
}

export const restApi = Eos({
  httpEndpoint: `${network.protocol}://api.bossweden.org:${network.port}`,
  chainId: network.chainId
})

function handleError(errmsg, context) {
  let e = JSON.stringify(errmsg);
  if ("string" === typeof e) {
    if (e.includes("unsatisfied_authorization"))
      return context.$t("apiErrors.unsatisfiedAuthorization", {
        accountName: context.$store.state.account.name,
        permission: context.$store.state.account.authority
      });
    if (e.includes("overdrawn balance"))
      return context.$t("apiErrors.overdrawnBalance");
    if (e.includes("ram_usage_exceeded"))
      return context.$t("apiErrors.ramUsageExceeded");
    if (e.includes("signature_rejected"))
      return context.$t("apiErrors.signature_rejected");
    if (e.includes("leeway_deadline_exception"))
      return context.$t("apiErrors.cpuUsageExceeded");
    if (e.includes("tx_net_usage_exceeded"))
      return context.$t("apiErrors.netUsageExceeded");
    if (
      e.includes("deadline_exception") ||
      e.includes("tx_cpu_usage_exceeded")
    )
      return context.$t("apiErrors.deadlineExceeded");
    try {
      e = JSON.parse(e);
    } catch (e) { }
  }
  return context.$t("apiErrors.unexpectedError") + "\n" + JSON.stringify(e, null);
}

// 添加币种图片，src为base64
export const supportCoin = {
  // eos: {
  //   contract: "eosio.token",
  //   symbol: "EOS",
  //   fixed:4,
  //   src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAVCAYAAAB2Wd+JAAABYUlEQVQ4jX3UP2sVQRSG8d9dCGpKGwOCCBkQFBWMCfcT2KWwiJaCYKVfwDK1jWipWIrc2BiwUhs/gCCmm9MGxUbs7MYic2VcZu+Bhd2Z8+z77J8ZpRS9I+e8MTVXSjHoVESs41NE3O/Now/iKS7jWURc6jXMSinjtD0smqGvmKeU/kwmRsRFvBjd/DqeTCZGxBo+Y94xK7idUnrXS3w0AcEMryLidA/ME9CyjtvnHKrmOXzA7xXgIiI2xom7uILDFeAB9sfgTYw/Q1vf8AP3IuJ8C25XcEp3Ua1O1V5DRJzBVWyu0D3AncbOgGtYq4M93aXmrXq9swS3m6aebqsJWxExG4Ob1aDVbTXhLNKwjG7qbqM71lzW1oA3aP/8PXysumNN+IKjIaW07+Rtvq8TF5ysiMOR5i88xE5K6ei/9RgRu3iOt3iJ71X1NR6nlH7+a+7sNes55wf1/EbOed7bc/4CUTq6he/WHK4AAAAASUVORK5CYII=",
  //   minAmount: 0.5
  // },
  bocai: {
    contract: "bosdicetokem",
    symbol: "BOCAI",
    fixed:4,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAYAAAA5Od+KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2OWY0YmM0YS0yNTYyLTRiNmMtYjk2MS0xNmI1M2Y1MjU3NzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0QzOEM0NzVENTIzMTFFOEI1MjZBODIzRTY0MTVERTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0QzOEM0NzRENTIzMTFFOEI1MjZBODIzRTY0MTVERTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OWY0YmM0YS0yNTYyLTRiNmMtYjk2MS0xNmI1M2Y1MjU3NzciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjlmNGJjNGEtMjU2Mi00YjZjLWI5NjEtMTZiNTNmNTI1Nzc3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NuzlSgAAD6tJREFUeNrsXQlYVdUWXsxzKogyCDilWZ+pRZZiCmmoDT4NZ5MGp8rCXtnw7PXUpk+fQ6lZWloWVppTzyE1yaFCzSkVxZREEEgUmeECF5C317mbK3Cnc+64Dp7/+9bHvYd779l7/WfvvfZaa+/tVFdXBwqaJ5wUchVyFTQHcu/7rpeiFRnj6Lg/tK9dm0mdWjHpzuROJu2ZdGQSxCSAizsTP17fGialTNRM8rnkMklnksEklUkKk0K5K0Wu5CKR0Uz6MOnLJEJinVvx122NfC6TyUEmh5js54Qr5NqonAOZxDEZyqSdHe4ZwWUcf5/NZCeTTUx+5j2AQq4FQANgEpMxTFo7uCz4QE3hgl35OiZfMDlBVXnOBMvkxuRJtA244qYTILYpAni5jvNyPsnLrZBrAJ5MEphcZJLIJFImQ0YkL+9FXn5PhdzGQ8M0JmlMljAJk6mRF8bLn8br43qrk4sW7xEmK+xkJNlrbF7Bu+voW5FcHLO+YrKPG03NET15/b7i9b0lyB3OHQXxcGsgntd3eHMm15vJZ0y2MGkDtxba8Hp/xvXQrMjtDBpPzxS4tTGF66FzcyE3lhsXd4MC4HpAfQyWO7n4pO5g0lLhtBFQH9tt3ZPZktzZfIxxVbg0OL9H/cyRE7lOTBbYstDNDNgIFnK9Wf3psTaQ2FcVziShXl8zKbfcOQqxFhE8hyq5z/MuRoFlXfTz1MjF6c4yhRurAPU4hAq5OCH/nomLwotVgHrERIAujiYXXWmYdtJC4cSqQH1uBgtdlZaS+yEonidb4S6uX4eQi1GOqQoHNgXqd4S9ycX45EpF93YB6tmsHDJznRiLQUZhu7ZebcDN2V37vrauBqpvVEPtjRooVBdTL34g13e8PciNARkE2j1c3MHPzQ+evnMSjO46Fpz0ePfOFaTCrN/egMraCrhemU+5OhOZfAmazA7RkLpWCM10XIzSnbIm/Nx84Zm7JsHEbk+L+vz5wj/h1QMzQF1bRbkl44oHJKfW2IcarhWSOuZOokysl6sXdGt1ByTFHRBNLKIr+8724buhT3AUtHInO6vrzvVvk5aL+bh/MQmlWPPWngEwMGwQzIx806Lf+TF9G3yRuhoySzMpVjMHNE6jSmu33KlUiY3wi4Do0BiLiUU80vFx+GjAMgj2DqJYVdT/NGtPhXCpxKtUW2z/kP7wRu+3rPab7fzC4EO6BL8CmiWpViMXV7qFU6tlp9s6QpBPECTc84ro7xz++6C4327ZGUZ1GUORYORhrDXJfYniI1xWXQZfxq6V9J0juYfFzz+YURbGWjFBIyvBWuTeAwQXZeF05+vB30r+3un8U5I+v/yhz+A2D3L5ffdyXiwmdzJFB8W4LuPB3+vmKo1dl3bY7H5fD/lGGNuJYYql5KIhNYpardr5tIMpdzdOWDhXcBZO5p0Q8WB4SL6ft6sPdG9NLvg12pRhZYrch4DYwmd0VEztrpuJ8s97X4ePTy4xajCpa9WgqlGZdd/3o+YL9yYEfyaDLCF3JLXHNcQ7GB4K11+nF3vOgMQ/18A7h/+jf4LPjKmK6gqz7uvm7Ab9gqOoqWOEJeQOoVQTtFrRZ2wIPQPvgbjOo+GqKhcm73lKpxWj16mmrlbSPW/U3dC+ntPnfWpj71BzyUVfJqkF0Wi1Dm7/iPFxhLXq+Q8uEl6vPPMJPPPTk9r/XVflsfFTfNdaqi4B9Q219r07M+Tu9L+LkkpCwYiv3xi5A6j1QS09xM03fd38YNXDX8GA0BjIr8iHEVsf17ZcsaisrYS3kt8AT5fGW1zERgwW3J2EEG0OuaQGGDRmXov8l6TvPM268FWDvgQ/d1+hBR+9dlQwqkxh7+UkmLFvOsxl3XBTYM+BoUFCiJI9uQEeAUJoTira+ATBW/fPZl1sGVTUVJgccxcemwefnP4Y4rs9Ba08/fV+5vaWXSippq9UcrFWpHaVCfENNvu7+FCMun2M8NrVSX969frz30L8rnHwB5srx7DuPCq0v+GnPqQfJdWEcb5Ek0suIB/u23icqwNpWwk/2lEz7lY16ZYzSjJg1m+vwa7MHwWDaX6/RTC91wyjv9U/NFrwkhGCXr4M5VB1o0ZuUw9RUuZP8HCE+MXpJVVFwl8XZ03LrWRd9NSkZ4UxGK+N6zoBHuv4D1G/1do7ENyd3XUeFAcCd6s9ILbldqBELIbd7g/u0+gaEjstSXzWyeWSy8JfNK6Q2JHbh0NeRR54uXkJkSWxxGpbhROp1TPtpXTL7SmVHB0JAV66XtDY8NhG81hjwHRWxJn8s/Dghr7gz4ylJzrFCcS60+pibU5uMKWS1xqwcOO6aIwkNIQwg9EYCioLtK8xXPjKva/pBB+kQKqny8YIkkJuoFweWWx5OM2Zd/Q9mL7X8OqWlOuaOC66D+dFLRBclZaAGLmBUqdCZFBlwmmwZdg2cGFjYFZpluCN+vD4f/X8hsb4CfeLgN7BD0AzQ4AUcj0olVyM8YLuxpd6viysHtiXvQ/G7oiDbRd/0P4/pzzbojKIiRU7EB5SyPWW4+OLFvTOEUmCBwm7zXUXvoW3kzXprvVB+nrDSgpwutTGi/TSKG8p5LqBjLFowBJYHrNCax1jK04rvCC892XGlFRL/d8H34QQX9I7BrtJIbeaWukx/CYFbX2C4Juh30OYXzv4W3VFuwbI21V8p5SnugaT9sTD6C5jqT/P1VLIVVEqORJzLj/VrO8ujfkURnYaKRhcDQ0rU5h/5H2I3z0e/D0CILJtb+rkqqSQW0Wt9FkNYrHF3JUoFg2T1k11y+hr7r+hL2zL2AqeLl5CF98UUv3a9phQSCG3gFrpD+Ts177+PGWF5O+34rnH4QYC7RcKzwvTqFE7Rgihwb7BUcIUSx9O5f0hfIYQ9C4uNhQ4yGNyB6XSFzVorc/1eFFwWGDCuFjUd8sl6iIdSxhdmOjBwgXY6L16sUcCPHG74Yze3Zd2Unv286S03CvUSt+QXOxa/T38Ydj/hsK18lxR3w/l1m6I780w9Qe/z4XHfoiFC0VpgqOkT9ADsHfkr0aJRRyWsCTFTsiVQm4GOXKZUbUnc7f2/btR81hrdIXJSc/AmrOrTX7/Mh+zK3jecsK+5+Ho1WOCsYatet0jGwXjSwyK1UXU1JMha3JxjNuV8WOjazgm4tRm818bYcLO0ULuk8GJoLNmKlhSVQyxm6LhEGt95dWlMLHrRDg89hi08W4rqhzo9WqYESlHclOBIFILzupcW/foJhgcPkSY4iw4Pk8gedOF9TqfC+DrihLPJwqtFRPuZvV+W9LyT8SGtPWUgvRG+TJELsnjRMtZl/r7lUM61zEtZj0juVdgLzZNKoaVKZ+ysXRwo248s+TmVAqD/z/HHYDosIESew8VZJdlU1RNitSpUBbFrnlFynKD1vAH/RbAmti10KFFJ+HaspMfCflRiF48xIerFrYM267tpqVg5i8vQ2l1GTkXgKGpq7HU1mSKj2gas2z1hfTqgflNKwethlUPrwE/dz/BEsZNXNKL04X/LxqwVDstkoLs0ixIyT9DUSUGV745m/Mlh7pi2Hi37dI2k77mIJ9gwbdczltaNg/5BXubl2Ty7E8TqTkuTDZCY+TuB6LArnHCzjGiPoshwB6t7xacE8Ic2cNP8v1wA7JKehaySZ6cTQzS2VRrhPNeNJrEAAP5LdxbCoaU1LF26YnFQooO0VabY8z4NbWEcxdVclHZ6C40ljfVEPMfXCjMiaWMtzin3XhxI+UtA436QU2RuxEIA7Mi0cjBYLwpBHoFaue6YpB4bo2wZohoi63HD5aQuxcMRBwotWDcCsFUF21oUZc+4GKwxNQ11HdyxenPHkvIxQj/BiCOK6pcKKkuFQjGBdaG4CMixQZXMWy9tFUO+zDjoSFqS8hFfA4yALbgqxXXYPzOUcI+yuZ08bjE5GzBGepdsdZONPUBMeRiTucxkAmwxc099Dbsz/pZ53+GUmTRQYFRIlx5T9BvrA/HuVhMLkJWB0JdLEmHxScWQnLOL42ud7ito94WOyv5dThy9aicqrhUzIfE7reMK6XSgODmnsaAZxvgJtn1KGatukWTfRwxioQuShkBfcmdDY235uy3jD+0GGQGtHZnH7y5VW9TYtEqxiiSzLDIlCEllVzESu4RkQ2wy92XY/jMh+S/kwUjTEbIAQlH/kghF7def0dujzlavtdUV3Wu47X8qny5VeddMLIFviXkIjBZ6YzcNJKqJ1SXVnheLlOeepwRM/2xhFxclJoAzQAE91A2hQQwceyMpeQicBBLlJNWKmt0ezIpa4YIIBEkHhhlLrkIzCrLk4tm9G3DKyNy87i+wV7kXgcJR6A4GoWVhbrkuvvIpfjTuL7tRi5iC8jE71yuJ6nNnB3THYBVXM9gb3IRLwPRNNiGKKsu1bmGm4QRPLegkZHPZIYlP2ApuTiYPcGkmDa5ui3X2cmZcpGLuV5VjiQXgef7jZdqptsThrYVcqG1C1zD6eYEJuct/SFrPb64iOclquTmycvFiHq0yjk61uybcIkcSfekWh4xWuD6+9RaP2btgWc2EIweySTys5jrD6iSi5gJmrAUoZarf4uPhufYOxiLuN6AOrl1vKBzqRtUuD0vka54JtcbeXLrMQc03pUaR2vPUO6Uv6dDt7hEvTxn7a7YXuQicEcS3H++iGLL9XecE6OI62WlLW9ij5k8LknBXbpSHNlyG57sVQ888cQBSOH6sPlSHXu5aTADDffBdYgvGtNdr1foBrH6tetv76Ks5nqwS0aePX1w6ErDVVu4sMfu4cJTeSd1roX5htvrlJE8Xu/JYMetFx3hYN0MmtM01trzphcKdLfJ9/eyS7e8ltd3s70V7SjvOcYnJzKJATvtnJNekq5fAbbzL2O9BvJ6XneEkh0dGtnPpAcTPEnCpmmzuSr9m+L5WD8jI4fXB+u115HKpRD3wvke7tSJWfQYH7bJLjql6lK914N8gqx1iyxe/s68Pg6f31MKamIWG+5/24l3ZVZdfFZpII31jpYWH352jJe3Ey9/JRWFUoxYV3Mj5D4mkaCJklicPY6OjAo9iXIhviHm/Fw+L1ckL+daILi7POl0BNAsU3wBNIdY4RHemFNk1iYsuAPOiau6ncGjHYYJC8ZEIJvffygvzwsgYhmlI+EK8gC2il1w06uDp05Gg+aMXzw/VtRxsMcZuU2PTsXpkIHoEI6huMfTQW74pYDM4AryRAqXZbhk8b7vemEEAI/pxAEUD5lsz1tXABfcn6jF6fxTzuiGVNWU19XeqK0rU5dVl9WUVXm5ef7Kpy44X8IJ8WkguFu8VIhdn6tAJjBnfa6C5tByFSjkKlDIVaCQq8Am+L8AAwBx7/WPDy3hrQAAAABJRU5ErkJggg==",
    minAmount: 0.5
  },
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
  vm.$message.info(vm.$t("apiErrors.waitFor"));
  if (data.quantity) {
    if (data.quantity < supportCoin[coinType].minAmount) {
      vm.$message(`${vm.$t("apiErrors.noLessThan")}${supportCoin[coinType].minAmount} ${supportCoin[coinType].symbol}`)
      return;
    }
    data.quantity = Number(data.quantity).toFixed(supportCoin[coinType].fixed) + " " + supportCoin[coinType].symbol;
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
      vm.$message.success(vm.$t("apiErrors.success"));
    }).catch((err) => {
      vm.$message.error(handleError(err, vm));
    })
  }
}
export function dogetfree(vm) {
  vm.$message.info(vm.$t("apiErrors.waitFor"));
  if(scatter) {
    return new Promise((resolve, reject) => {
      const eos = scatter.eos(network, Eos, {});
      eos.transaction({
        actions: [{
          account: "bosdicetokem",
          name: "open",
          authorization: [{
            actor: store.state.account.name,
            permission: store.state.account.authority
          }],
          data: {
            owner:store.state.account.name,
            symbol:"4,BOCAI",
            ram_payer:store.state.account.name}
        },{
          account: "bosdiceadmin",
          // 交易类型
          name: "getfree",
          authorization: [{
            actor: store.state.account.name,
            permission: store.state.account.authority
          }],
          data: {
            from:store.state.account.name
          }
        }
      ]}).then(() => {
        vm.$message.success(vm.$t("apiErrors.success"));
      }).catch(() => {
        vm.$message.error(handleError(err, vm));
      });
    });
  }}