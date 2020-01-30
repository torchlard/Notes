# prerequisite
need to trust public key cryptography and signature works
1. any msg encrypted by public key can only be decrypted with private key
2. anyone knows public key can verify msg (signature) sent by someone know private key

# flow
```
browser                 https://youtube.com
  -- get ip of youtube.com -->
  <-- return with public key signed by Google CA --
verify Google CA's public key
generate new secret key
  -- encrypt seret key with Google's public key -->
  <-- now both side get secret key, encrypt all communication with this key -->
```

# certificate authority
```
youtube.com web server                       Google CA

generate private,public key pair           already own private,public key pair
    -- create Certificate Signing Request with key pair, ask CA sign it -->
    <-- sign youtube.com's request with CA's private key --

now anyone can verify signature by CA's public key
```


















