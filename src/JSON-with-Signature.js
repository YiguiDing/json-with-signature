const NodeRSA = require('node-rsa');
const { v4: uuidv4 } = require('uuid');

// 使用公钥加密 
function encrypt(data,publicKey) {
  const pubKey = new NodeRSA(publicKey, 'pkcs8-public')
  return pubKey.encrypt(Buffer.from(data), 'base64')
}
// 使用私钥解密
function decrypt(data,privateKey) {
  const priKey = new NodeRSA(privateKey, 'pkcs8-private')
  return priKey.decrypt(Buffer.from(data, 'base64'), 'utf8')
}
// 使用自己的私钥对消息签名
function signRSA(data,privateKey) {
    const priKey = new NodeRSA(privateKey, 'pkcs8-private')
    const signature = priKey.sign(Buffer.from(data)).toString('base64')
  return signature
}
// 使用对方的公钥验证签名
function verifyRSA(data, signature , publicKey) {
    const pubKey = new NodeRSA(publicKey, 'pkcs8-public')
    const res = pubKey.verify(Buffer.from(data), Buffer.from(signature, 'base64'))
    return res
}
function base64Encode(msgStr){
    return Buffer.from(msgStr).toString('base64')
}
function base64Dncode(msgStr){
    return Buffer.from(msgStr, 'base64').toString()
}
function EncodeObj(dataObj,privateKey){//编码消息并签名
    dataObj["message_uuid"] = uuidv4(); // 保证签名的唯一性
    var dataStr = JSON.stringify(dataObj);
    var message = base64Encode(dataStr) // 消息用base64浅加密
    var signature = signRSA(message,privateKey) // 签名
    var data = { message , signature }
    return base64Encode(JSON.stringify(data))// 用私钥签名
}
function DecodeObj(dataStr,publicKey){//验证签名并解析数据
    var {message,signature} = JSON.parse(base64Dncode(dataStr))
    if(!verifyRSA(message,signature,publicKey)) return null // 用公钥验证签名 如果验证失败 返回null
    return JSON.parse(base64Dncode(message))  //如果验证成功 返回消息
}

class RSA_JSON{
    constructor(configObj){
        var {publicKeyStr,privateKeyStr} = configObj || {}
        if(privateKeyStr){
            this.privateKeyStr = privateKeyStr
            const nodeRSA = new NodeRSA(privateKeyStr, 'pkcs8-private')
            this.publicKeyStr = nodeRSA.exportKey('pkcs8-public') // 公钥
        }
        else if(publicKeyStr) this.publicKeyStr = publicKeyStr
        else {
            const key = new NodeRSA({ b: 1024 })
            const publicKeyStr = key.exportKey('pkcs8-public') // 公钥
            const privateKeyStr = key.exportKey('pkcs8-private') // 私钥
            this.publicKeyStr = publicKeyStr
            this.privateKeyStr = privateKeyStr
        }
    }
    parse(str){
        return DecodeObj(str,this.publicKeyStr);
    }
    stringify(obj){
        return EncodeObj(obj,this.privateKeyStr);
    }
}

module.exports = RSA_JSON