export default {
  header: {
    cn: "简体中文",
    en: "English",
    vipConetent:`
    <div class="vip-content">
    <h1>VIP</h1>
    <p>作为VIP，您将在我们平台上的任何游戏中获得所有投注的奖金。贵宾等级越高，奖励越多！VIP奖金会直接打到你的账号</p>
    <li>1 VIP-1: 1,000 EOS赢取 0.01% 额外奖励</li>
    <li>2 VIP-2: 5,000 EOS赢取 0.02% 额外奖励</li>
    <li>3 VIP-3: 10,000 EOS赢取 0.03% 额外奖励</li>
    <li>4 VIP-4: 50,000 EOS赢取 0.04% 额外奖励</li>
    <li>5 VIP-5: 100,000 EOS赢取 0.05% 额外奖励</li>
    <li>6 VIP-6: 500,000 EOS赢取 0.07% 额外奖励</li>
    <li>7 VIP-7: 1,000,000 EOS赢取 0.09% 额外奖励</li>
    <li>8 VIP-8: 5,000,000 EOS赢取 0.11% 额外奖励</li>
    <li>9 VIP-9: 10,000,000 EOS赢取 0.13% 额外奖励</li>
    <li>10 VIP-10: 50,000,000 EOS赢取 0.15% 额外奖励</li>
    <div>
    `,
    roadMap: `
    <div class="road-map">
      <h1>路线图</h1>
      <li>11-22 - 11-29 BOCAI可以玩DICE,并接入其他代币，如TPT,MEETONE等等</li>
      <li>11-29 - 12-06 JACKS游戏转移到BOCAI,JACKS代币按照比率转为BOCAI,大户竞技场开启,拍卖JKR改成使用BOCAI拍卖。
      对于JACKS游戏中,明知道系统BUG,却拼命利用BUG获取EOS代币的玩家，经过我们内部讨论，觉得该行为和 利用随机数BUG，盗取EOS的行为一致，我们会申请仲裁。对于无意中触发BUG行为的用户，我们不会追究。</li>
      <li>12-06 - 12-13新游戏开发与测试</li>
      <li>12-13 - 12-15 新游戏上线</li>
    </div>
    `,
    token: `
    <div class="token-intro">
    <h1>TOKEN介绍</h1>
    <p>代币介绍</p>
    <p>总供应量：8,800,000,000 </p>
    <li> 1. 出售token 5% </li>
    <li> 2. 社区奖励3％</li>
    <li> 3. 2％的开发者</li>
    <li> 4. 挖矿90％</li>
    <hr>
    <p>出售token</p>
    <p> 1EOS = 10000 BOCAI </p>
    <p>一共需要多少EOS：8800000000 * 5％/ 10000 = 44000 EOS </p>
    <hr>
    <p> 挖矿
    </p><p>总计：8800000000 * 90％= 7,920,000,000 </p>
    <p>一开始，单个eos可以挖掘100个BOCAI </p>
    <p>每次总量减少5％时，单个EOS产出减少四分之一</p>
    <p>第一次减半：7,920,000,000 *（1-5％）= 7,524,000,000 </p>
    <p>第二次减半：7,524,000,000 * (1-5%) = 7,147,800,000 </p>
    <p>等等</p>
    <hr>
    <p>分红</p>
    <p>第一次分红将于UTC+8 2018-11-9 21:00:00开始</p>
    <p>因为提前分红，社区奖励与团队代币不参与第一次分红</p>
    <p>分红需要质押,取消质押后24小时才会到你账号上，中途无法重新质押</p>
    <p>后续所有分红全部是实时的，每有人玩一局游戏，其中赢利的80%会直接到分红池，会直接按照质押比率分到你的账号。</p>
    <p>你可以选择在任何时候提取你的分红，你的分红是会一直累积的。</p>
    <hr>
    <p>FOMO</p>
    <p>FOMO模式将于UTC+8 2018-11-9 21:00:00以后开始</p>
    <p>如果在5分钟内，你是最后一个玩游戏的人，那么你将获得fomo奖池的50%</p>
    <p>参加fomo,单次投注金额 需要大于fomo奖池的千分之一</p>


    <hr>
    <p>收益分配</p>
    <p> 20％的开发者</p>
    <p> 60％的分红池</p>
    <p> 10％的FOMO池</p>
    <p> 10％的邀请者（如果没有邀请者，钱会转到分红池）</p>
    </div>
    `,
    howto: `
    <div class="howto">
    <h1>玩法介绍</h1>
  <li>1. 准备好你的EOS 帐号，如果还未有EOS帐号，可根据教程<a href="//medium.com/dapppub/create-your-own-eos-account-easily-using-the-non-service-fee-dapp-signupeoseos-b15c5347f2fc" target="_blank">创建</a></li>
  <li>2, 您需要透过Scatter 在网页上操作帐号，如果还未有安装Scatter，请<a href="//get-scatter.com/" target="_blank">安装Scatter</a></li>
  <li>3, 按下登入按钮，透过Scatter 进行登入</li>
  <li>4, 选择需要投注货币，您可使用EOS投注</li>
  <li>5, 设置需要投注量</li>
  <li>6, 调整滑条投注骰子号码上限，改变胜出机率</li>
  <li>7, 按下"掷骰子"按钮进行投注，如果 摇到骰子号码小于投注骰子号码上限，立即中奖</li>
  <li>** 由于游戏都在EOS 的智能合约上执，因此游戏保证公平，并不能作弊。我们透过独有的加密技术，保证结果不会被更改，请您放心下注。</li>
  <li>** 合约代码已在eospark验证,请点击<a href="https://eospark.com/MainNet/contract/bocai.game" target="_blank">查看</a></li>
    </div>
    `,
    contact: `
    <div class="contact">
    <h1>加入社区</h1>
    <div class="con-icon">
    <a href="https://t.me/joinchat/KdkdrUpvaXVksWMcWdeF1w"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACTUlEQVQ4T52UXUhTYRjH/8+ZWbSPbAvPtgR3tmC20XKLCCIRAzEhgi666SooKvDGvr9ISEzsQ6LrIERaF30aUXkXyC6mISu3ERHNoIt2TKRVXmxu54kz2dqOpzDfy/f/f3/v/3143oegs+qlUEAAOgDewcAuEPIEjIMpyrQwKqfice0xqt7w14ru2l4wzhCRoHcJMysg3JBTwmVgcqHkKYNsrm1Nq4hHQPDqAbR7DMQLnD8wOz31QdUWQS7XGlGwJgjwLAdS8jDwSU5lfUAyVwSJ7tAtArr/B1L2Mg+mp2Onqb6xeScJFCEiTb2qsRazBbvb2mE0GRG+P1zBYeYCt5DoDoYJdPBvaXyb/eho74QkeWAxr8NY5DXuDt2psjPjHtml4ASItlcqxrVGtLa2YW/nPlhtNjx/8Qy+Jj9U6ODt64hExrSgqJroJ4FMJUWS3Oi5eAV1desRj7/DcHgIx492wePeVLQc6zqMmRlZ+4BZEqXQVyLYKxW1XA0bG5DJZDBw9SYcDmdRzmR+4NCRpVVgRlp92isQ7dGrUXMgiJMnzsJsMhflN5MT6B/o1bHySxJdwX4S6IIeSK3L3Pc5OB1OnOo+hycjj/D46YMlVmbuI7ExIJHB8B6g1f/qI6vVhmw2i/n5Xxob56Cwd7EhpdAlIvStqCEVPp/+HLtWasIauxRKLPef/fkinJRTsa0ACuVu3iAFvAaqeUjAluUkY3BSAe//lnr7UfWvYIygAGJ1jPTojpHKFFWDjdBCQA6McQUcpbwyKn+ZSmhT/wb6x8YsBTHjjQAAAABJRU5ErkJggg==" /></a>
    <a href="https://github.com/loveblockchain/eosdice"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACOUlEQVQ4T62UMWgTYRTH/+9yNSQEDHhRyBIp7Zx2jYVeoASxg0qcvbSQzVqHWodqHBsESR0qFapNK6HaQduljo3UodoOZ7aABIcsMVfIFMjdeZ/cNYl36ZE4+KYPvvd+33v/995H+E9GbhxBEESOSCLGrjJgzPQhQGZEPw3GNhVFKfbGOUDBYDDo5fmPIBL7JspYsaXrtxuNRqPj1wWZkAtDQwfUzmBQxQyQVU2Ld2Bd0BVBKIJo0g7wer0YGR2FrmmoVCrQNM3JZ6xYU5R4u3TA1MRDdGD3SqfTeJzJwISZ1mw28WRpCYVCwQH7zVjc1MzK6HIolCdA6njclSRIkgQGIBwOo1qtQm21cEkQ8HJ1FW+3tv7CDONF7fT0gQWyl+Xz+SCXSni3vY2nmYzj9ee5HJLJJEaGh6Hr+tkdY59riiKeZSQIDSK6aJ5jsRg+7O7iTjKJL4eHDtCN6Wm82dhAYmoKpVKpP2hSFPF+ZwczqRQ+7e87QDOzs1jOZnE9kYAsy+dB9tICgQC+Hh+jXC7jWTaLo6MjEBGuTUwgt7ICv9+P8WgUqqq6ZNQj9v35eUsDjuPwam0NPM/jR6UCj8eDR4uL2Mzn3cV2a/+9uTlEIhE8XFiwgr6dnOD1+roFtpsBjNfrdbnvQA6cbsb2finKre5Amof2ipiDFR0EsLoOfFc1TTy3Il0Yz+eJ6GY/GGNsT9X1lOvS2gNDodAYZxgpEFlfSNcYkw2Oy5ua9D7k+h/9S2m9Pn8Aw2vyE4ssc7QAAAAASUVORK5CYII=" /></a>
    <a href="https://discordapp.com/invite/FSjpqHv"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACuUlEQVQ4T5WUXUgUURiG328nd3Mtd2c0yXYMSYPCjIyoRMLSLiTpwij6I8tAMzCQDEHLSvsBKxTswhIpScjQWsySErvo78KIKAu0MtNqVyxpdwtX2912T8xxx9RMdGAuzvt+33Pec+acIUzyaEU5dhZYNojSCAjnJYwNMMAMxi4POfpeTmyjcUKwLOkFdo2IUieb4K/GHnh93sxfjv5eVRsF6Q3hqyAIjQSYpoaMuAwYZmB7h23WBmXMQYHSgggN07wCQZoORK1hDC4CVjvtltccpBdNL4ho5UwgY5bZ6bRZY2i2UU4UNHg4FrJjWxoWR0fB5/Phs8UK0WDA128DkCQjJFFEZdUV2OyO0RbGsImCRPk6CDtVNSF+DVru3oTb7YZWq/0npNfrxY16Mw7kHB4TitWTXjR9IqKFqlp9qQJKoqkej8eDiOhYDA46/ScDHyhIkn8ACFYbv3S/gWg04rvNjqrqGmRnZfBxXb0ZYaEhSE5K5KW792Xh9p17fhBjSqIeIopUlKhFkWh//oSb1VdrkXukEBfLS5GRvgtzQiIQs3QJnj1t5X55RSWKis+qiVykl2QzAXwtG5PWo7Ghlpsfe3pRfPocys6fQYgkIr/wBNYlxGNzagr3lTRKqhESHpHeaCoiDZUo47gVy9HafAvOoWE0NjXzprB5oXwvOt6+Q1dXN4KD53K9prYOObn5fg5KKFAyyQR6T0CgoirxjxXkQafTYcv29HF7nnvoIDL370FT832cPFUKl8vFfa+XJftPtilPA7ow5af6n8nw2Gm3bFDvmhAkysoVWTYTGAP6hn4jFj8tttFLqzOERQmagAYiipsejHV64N3qtvV3KPXjfyNAgF4yHQdDAREJkwEZYz4ClTntlqMA3GrNRBDXtdL8GAFCCgFrwV8ObSOGNjDW4nRY2ydO8gcaPe0Q6JjRJAAAAABJRU5ErkJggg==" /></a>
    </div>
    </div>
    `
  },
  order: {
    all: "所有投注",
    my: "我的投注",
    transaction: "我的交易",
    time: "时间",
    better: "投注者",
    rollUnder: "小于该数获胜",
    bet: "投注",
    roll: "开奖号码",
    payout: "奖金"
  },
  auction: {
    round: "回合",
    endIn: "结束",
    last: "最后下注",
    placeBid: "在BOCAI出价",
    login: "登录",
    bid: "竞标"
  }
}
