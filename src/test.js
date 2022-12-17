const RSA_JSON = require("./JSON-with-Signature")


// // 生成一个1024长度的密钥对
// const key = new NodeRSA({ b: 1024 })
// const privateKeyStr = key.exportKey('pkcs8-private') // 私钥
// const publicKeyStr = key.exportKey('pkcs8-public') // 公钥


// at computer A
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
// eyJtZXNzYWdlIjoiZXlKdGMyY2lPaUowYUdseklHbHpJR0VnYldWemMyRm5aU0lzSW5KaGJtUnZiVjl0YzJjaU9pSmhNRE0yTnpNMlpTMWlNR1JqTFRSbFpUQXRPVEUyTXkwMVpqQTFaRE5sTmpjeVpqVWlmUT09Iiwic2lnbmF0dXJlIjoiQ0NMVnZRbVU1cXBjZnZvdWRhYWhzcytZNElMd3ZSMjRIR0VCY0h3cjBxbmFnVWlibmR6Z1R1UGhJeExDS1hsSUJuT2NyQ0ViUDhaeVQyVU40dUJpcnEvSkd0Q1BTWWpUVm9hRHNhemxkMlVWZTJkbjZhSmlOOVZYaWVEdU52LzhWUW5JMFlMamxWWCs2MmMvVzdPUUovenFYTVA4bWpETTRXMTEzTHFPYlRrPSJ9


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
/* 
output: if the receivedMessageStr isn't changed by someone
`
    {
        msg: 'this is a message',
        random_msg: 'a036736e-b0dc-4ee0-9163-5f05d3e672f5'
    }
`
output: if the receivedMessageStr is changed by someone,then the obj will equal to null
`
    null
`
*/