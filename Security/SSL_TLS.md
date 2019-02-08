# TLS 1.2 RSA handshake
aim: communicate safely via unsafe channel

1. A give protocol version, generate client random, encrypt method
2. B confirm encrypt method, digital certificate, server random
3. A validate certificate, generate premaster secret, use public key in certificate encrypt secret
4. B use private key, calc premaster secret
5. By encrypt method, use all 3 (client random, server random, premaster secret), generate session key; use session key encrypt whole conversation

## history
SSL 1.0
SSL 2.0
SSL 3.0
TLS 1.0 (SSL 3.1)
TLS 1.1 (SSL 3.2)
TLS 1.2 (SSL 3.3)
































