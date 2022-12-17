# json-with-signature

## 用处 - useage
当你想把一个javaScript的对象发送给另一台主机时，你可以直接使用`JSON.stringify()`来获取一个字符串，然后发送这个字符串，但是这不能防止信息在传递过程中被篡改，一种解决方法是，在发送时把要发送的消息通过RSA私钥签名，在接收端，通过公钥来验证收到的消息。

When you want to send a javascript object to another host, you can use `JSON.stringify()` to obtain a string and then send the string, but this does not prevent the information from being tampered with during transmission. One solution is to sign the message to be sent with the RSA private key when sending, and verify the received message with the public key at the receiving end.

## 公钥和私钥的生成 - Generation of public key and private key
```js
const NodeRSA = require('node-rsa');

// 生成一个1024长度的密钥对
const key = new NodeRSA({ b: 1024 })
const privateKeyStr = key.exportKey('pkcs8-private') // 私钥
const publicKeyStr = key.exportKey('pkcs8-public') // 公钥

```

## 通常用法 normal usage

**在消息发送端 - at message sender**
```js
const RSA_JSON = require("json-with-signatur")

var rsaJsonA = new RSA_JSON({
    privateKeyStr:
    `-----BEGIN PRIVATE KEY-----
    MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAIxhqwnCZe89OkAk
    iwXH9p+Xq9eTeYvkfSyaUUPyK00t/y+6u+44iJmnBB8zvrqnlYF5Z6PvHHBuLF7/
    ZhTA0RRIHQnNFrJ2n+v+cxMTp7PeU7x0l/IHYVYhMzW68WPgaRv7yK5TSdZLhKun
    1GAgljBU9H/wHLuTDJKoo4vHp1c5AgMBAAECgYB+MVoQdtktO6v+dxsmAkBX7H8E
    VkTgFXDUxJAi9TIpuhx4qnM/zUA2Z6XT6q8cmYNTFXCuNEcrZk6qwwnfxAjtyT9w
    wa+SEsEW6s3jgdoNm66MZJT32vU7YVkymCDPTf6iPSxja9D+7AXD/0noulauNlz0
    19DGXMgXNqEOpkr4pQJBAOJzCXbz6uhORKYK5nyGrEtGVqOEpy12xuNzCIDkldBX
    Xqv4TRgxOizOIYE9SPOaY4jtpoM33ZQket0l+YvbwHMCQQCes1/SUArKbrDmvJhW
    +/l1GDM1r90VKBWesZ/LwOkqc09UrZeltEIu740UTQTYhTzqo6kYz/cOuekAJrAy
    p3qjAkEAzIhPEiv6Dt0y0C6kQ/F4CX18n7EfNsdDmQi7s3/DeSyRDA73w1QjUXjV
    dmAeVjkqkfDlJzv8XOQePUUhgpt31QJABkCe59RLeIo/4fdQMS0gOOLJMbZKCYlY
    wLXSy94/0XJVj8p/DQI7EUpSzpfyNu2Y5s2n3dhjrWrZqS3dB0Hd7QJBANb7MP9X
    OfDLpVuSpS7v4DcGgR0fEIos9pNWDmae5Cx4nfRDKYK7nfkJYxhcPvK8OmzkT/XD
    AZ/bN6QLIKIK+d0=
    -----END PRIVATE KEY-----`,
});

var data = {"msg":"this is a message"};
var sendMessageStr = rsaJsonA.stringify(data);
console.log(sendMessageStr);
// output:
/*
eyJtZXNzYWdlIjoiZXlKdGMyY2lPaUowYUdseklHbHpJR0VnYldWemMyRm5aU0lzSW5KaGJtUnZiVjl0YzJjaU9pSmhNRE0yTnpNMlpTMWlNR1JqTFRSbFpUQXRPVEUyTXkwMVpqQTFaRE5sTmpjeVpqVWlmUT09Iiwic2lnbmF0dXJlIjoiQ0NMVnZRbVU1cXBjZnZvdWRhYWhzcytZNElMd3ZSMjRIR0VCY0h3cjBxbmFnVWlibmR6Z1R1UGhJeExDS1hsSUJuT2NyQ0ViUDhaeVQyVU40dUJpcnEvSkd0Q1BTWWpUVm9hRHNhemxkMlVWZTJkbjZhSmlOOVZYaWVEdU52LzhWUW5JMFlMamxWWCs2MmMvVzdPUUovenFYTVA4bWpETTRXMTEzTHFPYlRrPSJ9
*/
```

**在消息接收端 - at message receiver**
```js
const RSA_JSON = require("json-with-signatur")

// at computer B
var rsaJsonB = new RSA_JSON({
    publicKeyStr:
    `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCMYasJwmXvPTpAJIsFx/afl6vX
    k3mL5H0smlFD8itNLf8vurvuOIiZpwQfM766p5WBeWej7xxwbixe/2YUwNEUSB0J
    zRaydp/r/nMTE6ez3lO8dJfyB2FWITM1uvFj4Gkb+8iuU0nWS4Srp9RgIJYwVPR/
    8By7kwySqKOLx6dXOQIDAQAB
    -----END PUBLIC KEY-----`,
});


var receivedMessageStr = `eyJtZXNzYWdlIjoiZXlKdGMyY2lPaUowYUdseklHbHpJR0VnYldWemMyRm5aU0lzSW5KaGJtUnZiVjl0YzJjaU9pSmhNRE0yTnpNMlpTMWlNR1JqTFRSbFpUQXRPVEUyTXkwMVpqQTFaRE5sTmpjeVpqVWlmUT09Iiwic2lnbmF0dXJlIjoiQ0NMVnZRbVU1cXBjZnZvdWRhYWhzcytZNElMd3ZSMjRIR0VCY0h3cjBxbmFnVWlibmR6Z1R1UGhJeExDS1hsSUJuT2NyQ0ViUDhaeVQyVU40dUJpcnEvSkd0Q1BTWWpUVm9hRHNhemxkMlVWZTJkbjZhSmlOOVZYaWVEdU52LzhWUW5JMFlMamxWWCs2MmMvVzdPUUovenFYTVA4bWpETTRXMTEzTHFPYlRrPSJ9`

var obj = rsaJsonB.parse(receivedMessageStr)
console.log(obj);
// output: if the messageStr isn't changed by someone
/* 
    `
        {
            msg: 'this is a message',
            random_msg: 'a036736e-b0dc-4ee0-9163-5f05d3e672f5'
        }
    `
*/

// output: if the messageStr is changed by someone,then the obj will equal to null
/* 
    `
        null
    `
*/
```

## 最简单用法 Simplest usage
```js
const RSA_JSON = require("json-with-signatur")

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
```