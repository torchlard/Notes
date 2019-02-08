# Data encrption standard
DES, simplified-DES

## parts
1. key generation (P10 > Shift > P8 [k1]> Shift > P8 [k2])
2. encrption ([plaintext] IP > k1 > SW > k2 > IP^-1 [ciphertext])
3. decryption ([ciphertext] IP > k2 > SW > k1 > IP^-1 [plaintext])

5 functions
IP^-1 . f_k2 . SW . f_k1 . IP

ciphertext = IP^-1(f_k2(SW(f_k1(IP(plaintext)))))
K1 = P8(Shift(P10(key)))
K2 = P8(Shift(Shift(P10(key))))

IP = initial permutation

# DES
IP > Complex function + switch + key > inverse of IP

16 rounds of complex non-linear round function: 
  expansion + key addition + substitution + permutation


# Asymmetric encryption
## Message authentication code (MAC)
sender: encrypt message, generate MAC from MAC algorithm, send with msg
receiver: decrypt message, get plaintext and MAC, compare with MAC sent

if msg is not modified, compared MAC would be the same
also validate identity oforiginator

## digital signature
receiver use private key to show signature
if sender use private key, receiver use public key to decrypt,
  then it can verify who created the message


# RSA
- private key exchange protocol
  
theorem: N^(ED) mod(M) = N
C = N^E mod(M)

M = PQ
T = (P-1)*(Q-1)
public key: E
private key: D
satisfy formula ED mod(T) = 1

when P=11, Q=3 => M=33, T=20
pick E=3 => D=7

plaintext: "abcd", encode as 1234
encryption: N^E: 1^3=3, 2^3=8, 3^3=27, 4^3=31 (mod 33) => {3 8 27 31}
decryption: N^ED: 1^7=1, 8^7=2, 27^7 (mod 33) = 3, 31^7 mod 33 = 4 => {1 2 3 4}

## why works
if only know M, difficult to find P and Q
recommend 768 bits long modulus, key size 1024-4096 

no quick algorithm found to factorize large number M


# DH (Diffie-Hellman)
- private key negotiation protocol
assume algorithm = 100*n, then public_key=100

1. Alice generate random=5, output=100*5=500
2. Bob generate random=6, output=100*6=600
3. exchange 500, 600 without encryption
4. Alice calc (own private)*(received)=5*600=3000
5. Bobl calc (own private)*(received)=6*500=3000
6. shared private key = 3000, use it for encryption


# Watermark
can apply to image, video, audio, e-book, network
function:
authentication and integrity checking, hidden annotation, 
secure and invisible communication (via some media eg. image)

# biometric
better authentication reliability compared to numeric codes and physical devices
1. fingerprint
2. 

process: enrollment -> live capure -> template extraction -> template comparison













