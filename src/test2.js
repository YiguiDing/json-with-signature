const RSA_JSON = require("./JSON-with-Signature")

var rsaJSON = new RSA_JSON();

var str = rsaJSON.stringify({
    message:"this is a message"
})
console.log(str);

var obj = rsaJSON.parse(str);
console.log(obj);

console.log(rsaJSON.privateKeyStr)
console.log(rsaJSON.publicKeyStr)

// output:
/*
eyJtZXNzYWdlIjoiZXlKdFpYTnpZV2RsSWpvaWRHaHBjeUJwY3lCaElHMWxjM05oWjJVaUxDSnlZVzVrYjIxZmJYTm5Jam9pWkRNd1kyWmxPVFV0Wm1JNE55MDBOakk1TFRsbU5qRXRaVGd4TkdObE5UZGxPRFpqSW4wPSIsInNpZ25hdHVyZSI6IktQdU1iMUxnN3BFb3RFbWtHeUlXTHZTVFFueDdRa1FGeFlxdXQ4eUtuM3JTVW5GMnd6MVg0UmxrUytHUXFKWG5TZ21aV1FVbzRhZXVqQUxsMnNyamdKdWhPVzMyZVdPODF0OVBMS1k3WkE5MFI4bWNRbkVxNzlscWZITXlta1NLVXRFRlA5UVlHeEo5MWhZbDNQbTJIN3Znb2p1TU9VU1QyMzRRb0p4ZEw3WT0ifQ==

{
  message: 'this is a message',
  random_msg: 'd30cfe95-fb87-4629-9f61-e814ce57e86c'
}

-----BEGIN PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIxVUh6BismrrDG5
pToI0pnv4liHivImZRceX64Q5DzX1+ss5QQ+uPbTMERYUrD0PrlMIrSMrdwNmemz
J0DX499BOj62fxywjhdHTwzLPgNV+dClSytL/2NQQDyWw1smsiJytTA4rnaTk0xX
Qk+09r8xlRS9nymurWiWJNgAXGZXAgMBAAECgYBnTDKrc+2mb3DMFXwzEOV9HJ//
TJ6RioOlFd2WMqbexn8QhLZ7fnQGdAQ2etE7oj49hXaScm9T6MsfxJkjWQdJaqrv
k5aXbSSbK4VGtgGaJ1emybvT0xzRGU5hD1nHrfxoGMmRRcNvJh60PvHsIb2oT3F0
mgKiUar7plRw7/h7AQJBAMimgK773NkVcZa5QGlFL1emOSz3avUlGrMYuis8gV/p
GSBal9ktEtMRrT/hJwI4MPwi92+ckrqICBbGLWFl2tcCQQCzC1qRj11OSw5IsZf0
1/PKm8s2qK6SomnoS2WK3nFXk+6TL/+DGrCUTA3E/gY48kN8GE8jKv+UKuj+mjzr
O+CBAkB/2QeZd0Wq1G0B2pvd94VI1dMMgcGW3cN7ZkAJGI5erEmkQdULPhsGffbk
AvQ2B9O+dBEw/pTHYbG1wSRdMOcVAkBKzcKQMBqmnFsiafh31kXH76FOe9k78FlZ
MS8Cfv9RvL+fhR02tE70FnZmSE9nOWiSj0F5Cvzu9aKUxPIQwdqBAkEAlx5Aqn5Y
rEh5ngdgHy49SIDvXRCwyPL0NBbsll5kCo/l6cY2H6xbblYZsU7YGSUdLRAX/jXf
hTuPtFnJUWqjqg==
-----END PRIVATE KEY-----

-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCMVVIegYrJq6wxuaU6CNKZ7+JY
h4ryJmUXHl+uEOQ819frLOUEPrj20zBEWFKw9D65TCK0jK3cDZnpsydA1+PfQTo+
tn8csI4XR08Myz4DVfnQpUsrS/9jUEA8lsNbJrIicrUwOK52k5NMV0JPtPa/MZUU
vZ8prq1oliTYAFxmVwIDAQAB
-----END PUBLIC KEY-----
*/