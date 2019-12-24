/**
 * @file token demo
 * @author hwm
 * @desc session有缺陷
 * 1. session基于实例，存储在内存中，服务器是有状态的，不利于分布式部署
 * 2. session基于浏览器，依赖宿主
 */

// jsonwebtoken， 用于生成token
// koa-jwt，鉴权，用于鉴定是否符合标准

// token生成规则，分为3部分
// header： {"alg": "HS256", "typ": "JWT"}
// payload：userInfo
// signature：使用密钥加密生成的签名


