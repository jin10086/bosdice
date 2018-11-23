import { network } from "@/network/transtion";

export function login(ctx) {
  scatter.getIdentity({
    accounts: [network]
  }).then(() => {
    const account = scatter.identity.accounts.find(
        account => account.blockchain === "eos"
    );
    if (!account) return;
    ctx.$store.commit("UPDATE_ACCOUNT", {
      account: account
    });
    ctx.$store.dispatch("UPDATE_EOS_ASYNC");
    ctx.$store.dispatch("UPDATE_TOKEN_ASYNC", {
      type: 'bocai'
    });
  }).catch(err => {
    // ctx.$message({
    //   type: 'warning',
    //   message: e.message
    // });
    console.log(err);
  });
}
