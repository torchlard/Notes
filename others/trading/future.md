# CBDC
digital US dollar

# storage 
filecoin (FIL)

存储矿工不仅提供存储服务，也确保链上的共识

为防止矿工选择忽略真实存储需求，只是提供「承诺容量」，Filecoin 还引入「已验证用户」的概念

# oracle machine 預言機
get data from outside the chain
eg. smart contract that link stable coin to gold price
- need to get gold price from outside world

1. user-sc make an on-chain request
2. chainlink-sc logs an event for the oracles
3. ChainLink core picks up event and routes the assignment to adapter
4. ChainLink adapter perform request to external API
5. process response and passed back to core
6. core reports data to ChainLink-sc

decentralised oracle machine


# filecoin
Filecoin 创新性地允许存储矿工在没有存储需求时可以向网络承诺容量，
证明其供应及其对存储的运维能力，并在当有存储需求时获得存储订单，升级扇区，获得额外的交易收入。

Filecoin 网络引入已验证用户的概念，在传统资源驱动区块链网络的基础上增加了一层社会共识。
已验证用户的数据可以获得更多区块奖励补贴，验证过程也相对简单，由一个去中心化的验证者网络执行。只要验证过程透明公正并会接受审计，这会使得 Filecoin 网络变得更去中心化。

扇区是 Filecoin 上的存储的最基本单位

已验证用户交易订单占据的权重要大于普通交易订单的权重

## 故障
如果扇区处于故障状态，每天需要支付费用。为了促使矿工尽快处理故障，费用的数额略大约该扇区的预期收入

如果扇区连续两个星期依然存在故障 => 支付终止费用，且从链上删除










