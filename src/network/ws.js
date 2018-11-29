const { EoswsClient, createEoswsSocket } = require("@dfuse/eosws-js");
import { InboundMessageType } from "@dfuse/eosws-js";
// const WebSocket = require("ws");

const endpoint = "mainnet.eos.dfuse.io";
const token = "eyJhbGciOiJLTVNFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDQ3MjM5ODAsImp0aSI6IjY2N2UxMDRjLWY2MDktNDNjNS1hMzNmLTAzMWY4NTU2YTU3MCIsImlhdCI6MTU0MjEzMTk4MCwiaXNzIjoiZGZ1c2UuaW8iLCJzdWIiOiJDaVFBNmNieWU1blNKcDFmV2tmTktOTlZyYnVZRW9UdHQyUmt2VEJCMEg0K0wxSjlsSUlTT3dBL0NMUnRlQTljU3lETUR2UjU5Z2NBZlBMVjRXSUNMWTBsemRFY0dUdmoybVZ1emhta3UyYWs4SEhzYSs1Y3RrTFd6WU5kNjJyM3FFc00iLCJ0aWVyIjoiYmV0YS12MSIsInYiOjF9.w_Fn-q2pTpBFgsSp0BTf2HZ5XD4AHk_dzdCh-EwCN5PHKziOpzzrg-nxugLPaLmsSUXc5h84SCQiMo60Ri2NrQ";

const client = new EoswsClient(
  createEoswsSocket(
    () => 
      new WebSocket(`wss://${endpoint}/v1/stream?token=${token}`)
  )
);

/**
function handleData1(message) {
  switch (message.type) {
    case InboundMessageType.ACTION_TRACE:
      switch (message.req_id) {
        case "roll_result":
          const block_time = message.data.trace.block_time.split("T")[1].split(".")[0];
          const action = message.data.trace.act.data.result;
          action["block_time"] = block_time;
          return action;
      }
      break;

    case InboundMessageType.TABLE_DELTA:
      if (message.req_id === "dice-auction" && message.data.rows.length !== 0)
        return message.data.rows[0].json;
      if (message.req_id === "dice-rich" && message.data)
        return message.data.rows;
      if (message.req_id === "dice-rich-my" && message.data)
        return message.data.rows;
      if (message.req_id === "fomo-pot")
        return message.data.dbop.new;
      break;

    case InboundMessageType.TABLE_SNAPSHOT:
      if (message.req_id === "dice-auction" && message.data.rows.length !== 0)
        return message.data.rows[0].json;
      if (message.req_id === "dice-rich" && message.data)
        return message.data.rows;
      if (message.req_id === "dice-rich-my" && message.data)
        return message.data.rows;
      if (message.req_id === "fomo-pot" && message.data.rows.length !== 0)
        return message.data.rows[0];
      break;

    case InboundMessageType.LISTENING:
      const listeningResp = message;
      console.log(
        `Received Listening message event, reqID: ${listeningResp.req_id}, next_block: ${
          listeningResp.data.next_block
        }`
      );
      break;

    case InboundMessageType.ERROR:
      const error = message.data;
      console.log(`Received error: ${error.message} (${error.code})`, error.details);
      break;

    default:
      console.log(`Unhandled message of type [${message.type}].`);
      break;
  }
}
*/

function formateTime(utc) {
   let localTime = new Date(utc + "Z").toTimeString();
   localTime = localTime.split(" ")[0];
   return localTime;
}

function handleData(message) {
  if (message.type !== InboundMessageType.LISTENING && message.type !== InboundMessageType.ERROR){
    switch (message.req_id) {
      case "dice-auction":
        if (message.data.rows.length !== 0) {
          return message.data.rows[0].json;
        }
        break;
      case "dice-rich":
        if (message.data) {
          return message.data.rows;
        }
        break;
      case "dice-rich-my":
        if (message.data) {
          return message.data.rows;
        }
        break;
      case "fomo-pot":
        if (message.type === InboundMessageType.TABLE_DELTA) {
          return message.data.dbop.new;
        }
        if (message.data.rows.length !== 0) {
          return message.data.rows[0];
        }
        break;
      case "roll_result":
        console.log(message, 'handleWS');
        const block_time = formateTime(message.data.trace.block_time);
        const action = message.data.trace.act.data.result;
        action["block_time"] = block_time;
        return action;
    }
  } else if (message.type === InboundMessageType.ERROR) {
    const error = message.data;
    console.log(`Received error: ${error.message} (${error.code})`, error.details);
  }
}

export { client, handleData }
/**
 * client 使用方法
 * handleData 是处理原始数据的函数，不想在这里处理，可以直接在vue文件中直接处理
 * 如果是多页面的(有router),可以在mounted里面订阅，然后在destroy里面取消订阅
 * getActionTraces()、getTableRows(),这两个函数都可以有两个参数，前面是data,后面是options
 * options可以指定req_id、fetch(默认是listen)
 * data是参数
*/