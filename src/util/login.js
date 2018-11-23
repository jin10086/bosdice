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
  }).catch(e => {
    ctx.$message({
      type: 'warning',
      message: e.message
    });
  });
}
