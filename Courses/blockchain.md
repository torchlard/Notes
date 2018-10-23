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
- target: difficulty of proof-of-work algorithm (POW)
- nonce: counter for POW
- magic number: always 0xD9B4BEF9, used to identify file type/data structure
- block size
- merkle root: hash of root of Merkle Tree
- version
- timestamp: creation time of block
total 88 bytes

#### body
- transactions: list of transactions
total 1-9 bytes


## Merkle tree
H_ab -- {H_a, H_b}
H_ab = Hash(H_a + H_b) [+ means concatenate]

benefit: only need to send portion of nodes to proof certain node is not tampered













