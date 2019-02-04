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

### verify signature
for asymmetric key encrption:
if use public key encrypt -> then use private key decrypt
if use private key encrypt -> then use public key decrypt
results both the same

1. owner of hash use his private key to encrpyt hash => create signature
2. other receiver first calc hash, then use public key of owner published, to decrypt signature, compare 2 hash
-> if same, then signature valid

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
forward 1 valid transaction to honest node, do another transaction and mine secretly
success when attacker chain is faster than honest chain (main chain)

P(success) = 1       if p <= q
             (q/p)^z if p > q
[p = P(hoest node find next block), q = P(attacker node find next node)]

P(attacker success) quite low if using 6 block confirmation

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



# blockchain concensus
## objective
agreement
collaboration
co-operation
equal rights
everyone participate
equally active

## types
Proof Of Work

Proof of stake
Delegated PoS
Leased PoS

Proof of Elapsed Time

Practical Byzantine fault tolerance
Simplified BFT
Delegated BFT

Directed Acyclic graphs
proof of activity
proof of importance
proof of capacity
proof of burn
proof of weight

## Proof of work
too complicated: take lot of time to generate block
too easy: DDoS attack

fair deal of difficulty for hackers
make hackers difficult to change chain
no miner can have overall control

### issues
huge energy consumption, high cost
centralization of miners
51% attack

## Proof of stake
implementations: ethereum, decred, peercoin
new block depend on user's wealth
blocks are forged/minted
forgers: validate transaction, create new block

### process
forger first put coin at stake, more coin higher chance to create block
forger get reward / transaction fee

#### randomized block selection
find lowest hash value + size of stake

#### coin age based selection
num coin being staked * #days coin held as stake
coins unspent for >= 30 days
once coin used sign block => coin age = 0
age max = 90 days

hash(block_header) < target * coinAge
larger coinAge, more hash possible

### PoS pooling
if stake amount too high, can join pool, earn profits
1. loan coin to another user in pool, share profit with you
2. join pool yourself

### benefit
no strong hardware needed, energy saving
reduce threat 51% attack

### drawback
Nothing at stake
- forger can vote both sides of every fork that happen, no cost fork

### Casper protocol
forgers stake portion of Ethers as stake
validate block by placing bet on it
block appended => validator get reward proportion to bet
malicious block => punish, all stake lost

## Delegated PoS
holder vote to elect witness to do block generation and trans, validate on their behalf
vote group of 'delegates' 
- overseee overnance & performance of entire blockchain
- not in transaction validation, block production

21-100 elected witness in DPoS
witness shuffled periodically
designated timeslot to publish block 
if witness fail to generate block/publish invalid transaction => vote it out
longest chain wins

take turn produce block every 3s
invalid for block producer to produce block at other timeslot

1/3 node can be malicious/malfunction => minority fork
minority form produce every 9s ; majority fork every 2 blocks/ 9s

## Byzantine fault tolerance
10 divisions army outside city, each division 1 general
general communicate each other, decide common action
some generals are traitors
1 Commander, rest are subordinates

### objective
good plan: >= 6 attack/retreat
bad plan: <= 5 attack, >=1 retreat

### process
default = 'retreat'

corollary 1: if 3 process, cannot deal with 1 faulty
corollary 2: no solution < 3m+1, m = #traitor

assumption:
1. every msg sent delivered correctly
2. receiver of msg knows who sent it
3. absence of msg can be detected

### Oral msg algorithm
OM(0)
- commander sent value to every lieutenant
- every lieutenant use the value

OM(m), m>0
- commander sent value to each lieutenant
- for each i, vi = value lieutenant i get from commander 
- lieutenant i as commander, send vi to n-2 other lieutenants [OM(m-1)]
- vj = value lieutenant i get from other lieutenant j [OM(m-1)]
- lieutenant i use majority voting

O(n^m) expensive




















