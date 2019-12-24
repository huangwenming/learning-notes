# 搭建基于Node的https/http2服务
## 弄明白https原理
需要阅读一下./key-pem-crt/createKey.sh文件，里面介绍了https工作原理

## 生成证书和私钥文件
cd key-pem-crt
sh createKey.sh

**注意设置的站点域名，我本地设置的是test.baidu.com(使用者应该修改成自己站点的域名)**

## 搭建https服务
node app.js

## 通过浏览器访问服务
需要信任一下证书，chrome会判定该链接不是一个 private connection


## 搭建http2服务
node http2app.js
