import Vue from 'vue'
import Vuex from 'vuex'
import { restApi, supportCoin } from "@/network/transtion";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: "",
    // 分别是eos余额和别的代币余额
    eosBalance: '0.0000',
    otherToken: '0.0000',
    fomoPool: 0
  },
  getters: {
    eosBalance: state => {
      return state.eosBalance;
    },
    otherToken: state => {
      return state.otherToken;
    },
    username: state => {
      return state.account ? state.account.name : false;
    }
  },
  mutations: {
    UPDATE_ACCOUNT(state, payload) {
      state.account = payload.account;
    },
    UPDATE_EOS(state, payload) {
      state.eosBalance = payload.balance;
    },
    UPDATE_TOKEN(state, payload) {
      state.otherToken = payload.balance;
    },
    UPDATE_FOMO(state, payload) {
      state.fomoPool = payload.fomo;
    }
  },
  actions: {
    UPDATE_EOS_ASYNC({ commit, state }) {
      // 请求余额
      let eos = 0.0000;
      restApi.getAccount(state.account.name).then(({ core_liquid_balance }) => {
        eos = Number(core_liquid_balance.split(" ")[0]);
        commit('UPDATE_EOS', {
          balance: eos
        });
      });
    },
    UPDATE_TOKEN_ASYNC({ commit, state }, payload) {
      /* payload 参数形式
      {
        type: bocai
      }
      */
      let num = 0.0000;
      restApi.getTableRows({
        code: supportCoin[(payload.type)].contract,
        table: 'accounts',
        scope: state.account.name,
        json: true
      }).then((res) => {
        // num = res.rows.length === 0 ? 0.0000 : res.rows[0].balance.split(" ")[0];
        if(res.rows.length) {
          res.rows.forEach(row => {
            if(row.balance.indexOf(supportCoin[(payload.type)].symbol) > -1) {
              num = row.balance.split(" ")[0];
            }
          });
        }
        commit('UPDATE_TOKEN', {
          balance: num
        });
      });
    }
  }
})
