# 搭建基于Node的定时任务
> 主要用于定时清理开发机指定目录，防止磁盘空间不够，导致服务停掉

## 弄明白node-schedule原理
需要阅读一下https://github.com/node-schedule/node-schedule，里面介绍了Cron-style Scheduling

## 搭建定时服务，建议使用PM2进行管理
node clearDisk.js

然后按照命令行提示进行输入

