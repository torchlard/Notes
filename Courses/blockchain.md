# Bitcoin
decentralized currency without central authority
transactions verified by network nodes though cryptography
transactions recorded in blockchain
created as reward by mining

## blockchain
transactions stored in block, chained sequentially
header -- body
current hash -> previous hash -> previous hash -> ... -> first hash

### block
#### header
- prev hash
- target: difficulty of proof-of-work algorithm (POW) [256 bit]
- nonce: counter as input to POW (only parameter to calculate hash) [32-bit]
- magic number: always 0xD9B4BEF9, used to identify file type/data structure
- block size
- merkle root: hash of root of Merkle Tree
- version
- timestamp: creation time of block
total 88 bytes

#### body
- transactions: list of transactions
total 1-9 bytes

### block generation
collect set of valid transactions -> calc Merkle Root
run POW to mine valid block
- calc hash of block header repeatedly (SHA 256)
- nonce++ until resulting hash matches specific target
successfully mine valid block

more 0, higher difficulty

### hash
hash function = map arbitrary sized data to fixed size
eg. modulo operation, MD5 hash, SHA 256 hash
- determinism
- every hash value map to output range evenly
- non-invertible

### propagation
P2P network connect all nodes
each node has list of neighbor nodes
when valid block generated, broadcast to miner's neighbors
when receiving new blocks, first validate correctness and then broadcast to own neighbor

## transaction
### digital signature
Alice have pair of public and private key
encrypt msg with private key -> encrpted msg
publish his encrpted-msg and public key, others can verify belonging of this msg
- verify author, data & time of signature
- authenticate msg content
- verified by 3rd party

```graphviz
digraph {
  msg1 -> hash_fn -> h -> encrypt -> "S(signature)"
  "private key" -> encrypt

  msg2 -> hash_fn -> h -> compare
  S -> Decrypt -> h' -> compare
  compare -> "return signature valid or not"
}
```
script contains signature & public key

## input & output
input = ref to output of prev transaction
ScriptSig = redeem prev transaction output
output = instruction for spending bitcoin
ScriptPubKey = people with private key to redeem output

## Bitcoin Script
turing incomplete
reverse polish
stack based

bitcoin owned = unspent transaction output

## Double Spending
forward 1 valid transaction to honest node, mine another transaction secretly
success when attacker chain is faster than honest chain (main chain)

P(success) = 1       if p <= q
             (q/p)^z if p > q
[p = P(hoest node find next block), q = P(attacker node find next node)]

P(success) quite low if using 6 block confirmation

## Concensus
when 2 nodes generate new blocks simultaneously, solve by concensus rules:
1. transactions verificaiton by every node
ensure only valid transaction propagate across network
long checklist (syntax, data structure, size ...)

2. transactions aggregation into new blocks by mining nodes
most parameters fixed in candidate block, except nonce
first transaction in block = coinbase transaction
mining effort reward
(input: coinbase, output: miner's bitcoin address)

3. verification of new blocks by every node
4. selection of longest chain by every node 

### Merkle tree
summarize all transactions 

H_ab -- {H_a, H_b}
H_ab = Hash(H_a + H_b) [+ means concatenate]

benefit: only need to send portion of nodes to proof certain node is not tampered

### proof of work
data that is difficult to produce but easy to verify if satisfying certain requirements
bitcoin blocks generated around every 10 minutes
frequency of currency issuance & transaction settlement

#### adjust difficulty
to keep block generation at 10 mins, mining difficulty must be adjusted to account for changes
every 2016 blocks, retargeting occurs automatically and independent on each node
<10 min, then increase difficulty ; >10 min, then decrease difficulty

## blockchain forks
concensus rules changes to add new features, improvement and bug fixes
hard fork: change protocol, allow previously invalid rules
soft fork: backward compatible with old nodes

## P2P network
add nodes equal, no special nodes
to join bitcoin network, contact one node that's already in network (seed node)
gossip protocol: simple flooding algorithm

latency increase with block size


## difficulty, target, bits
misleading goal: produce hash with n leading '0's
actual goal: output hash less than specific binary number (target {in hex representation})

output = 0000066666666666
target = 00000f8798877878

targets {truncated} <--interchangable--> bits {compact representation}

reason:
if we can only ajust difficulty by changing number of leading 0s, then difficulty can only be *2/halfed for every adjustment, not flexible enough

genesis: 1d00ffff -- 4 bytes --> 256 bits, 32 bytes hash target

### 1d00ffff
1d -> 1st byte: number of bytes to represent target (nums after '0's)
00ffff -> most sig figures (represent 32 bytes in 4 bytes)

double digit hex number under byte unit
"1d" in hex = 29
total length of target = 32 byte
so 32-29 = 3 byte left for leading '0'

                [3 bytes]
{3 bytes of '0'} 00 ff ff {26 bytes of '0'}
00 00 00                    00 00 .... 00

eg. 9425 -> 425 000 000 (9 digits long, most sig nums "425")
          = 425 x 10^(9-3)

### difficulty
difficulty = human readable measure of relative difficulty again easiest target

difficulty = max_target / current_target

easiest bit = 0x1d00ffff

why in early time difficulty stay at 1 for long time?
- because it takes much longer time (>>20160 mins) to generate 2016 blocks, but difficulty cannot go below 1, so it stays 1.

## client software
### full node
download entire blockchain, > 145 GB, and +1M/10min

### SPV (Simplified payment verification)
thin client, only download entire header data
+4.2 MB/year






















