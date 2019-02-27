# 前端程序异常收集与上报demo

## 功能点
**准备工作1：安装依赖和开启服务**
```bash
npm install

npm run test
```
**准备工作2：安装mongodb数据库并在默认端口开启服务**

---
**正式操作**
1. 访问含有错误信息页面
http://localhost:8585/client/test-error/

2. 查看mongo中的错误信息
可通过mongo的命令行，也可以通过http://localhost:8585/middleware/errorMsgList?project=test来获取

---
**Tips：**
1. 如果有对应的source-map文件，则解析出源文件中的报错位置，存储在数据库中；否则直接存储错误信息

2. source-map文件优先从本地读取，没有的话，从远程读取，读取后存储在本地，相应的文件夹为`.server/mapfiles/`

3. 错误信息存储的mongodb库为：report->errorinfos, 表的设计文件在`.server/database/model.js`

4. 只使用收集功能，项目目录下`npm run dev`启动服务；借用前端页面进行测试，`npm run test`，然后访问http://localhost:8585/client/test-error/

5. node版本：node > 6.0

