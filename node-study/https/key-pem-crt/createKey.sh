#!/bin/bash
#TLS/SSL是一个公钥/私钥结构，每个服务器/客户端都有自己的公钥/私钥，在建立安全传输之前(握手之后)，
#服务器和客户端之间需要交换公钥

#使用openssl生成客户端、服务器的私钥
openssl genrsa -out server.key 1024
openssl genrsa -out client.key 1024

#基于各自的私钥生成公钥
openssl rsa -in server.key -pubout -out server.pem
openssl rsa -in client.key -pubout -out client.pem

#交换公钥的时候，为了确保公钥来自目标服务器，引入了数字认证来进行认证
#主要是在建立链接前，会通过证书中的签名来确认收到的公钥是否来自目标服务器
#数字证书中主要包含：服务器的名称和主机名、服务器公钥、签名颁发机构名称，来自签名颁发机构的签名

#数字证书的颁发机构是CA，CA为站点颁发证书，且证书中有CA通过自己的公私钥实现的签名

#下面将演示如何做自签名证书
#证书签名是一环一环颁发的，CA那里有一个根证书，根证书签名生成子证书

#1.生成CA证书
#1-1.生成ca私钥
openssl genrsa -out ca.key 1024

#1-2.生成CSR（certificate signing request）文件
#csr填写的信息备忘:subject=/C=CN/ST=Beijing/L=Beijing/O=baidu/OU=map/CN=test.baidu.com
openssl req -new -key ca.key -out ca.csr

#1-3.生成ca证书
openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt


#下面是给自己的站点进行签名，获取证书

#1.生成CSR文件，该阶段设置的Common Name匹配站点域名
#csr填写的信息备忘:subject=/C=CN/ST=Beijing/L=Beijing/O=baidu/OU=map/CN=test.baidu.com
openssl req -new -key server.key -out server.csr

#2.借助CA签名生成生成证书
openssl x509 -req -CA ca.crt -CAkey ca.key -days 1365 -CAcreateserial -in server.csr -out server.crt

