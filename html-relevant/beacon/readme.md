> 主要用于测试html的新特性beacon，使用beacon向后端发送请求，代替xhr或jsonp，
好处是**支持页面unload（almost left）时能把请求发出**。

## 为什么使用beacon
1. xhr  

```javascript
window.addEventListener('unload', function(event) {
  var xhr = new XMLHttpRequest(),
    data = captureAnalyticsData(event);

  xhr.open('post', '/log', false);
  xhr.send(data);
});

function captureAnalyticsData(event) {
  return 'sample data';
}
```
注意`xhr.open('post', '/log', false)`的第三个参数，
false为同步请求，也就是document unload之前必须等待请求发出并响应；
true表示异步请求，在document unload时容易被浏览器遗弃。

2. jsonp  
jsonp其实就是为script指定一个src，这种情况下浏览器会在document unload前等待资源加载。

## beacon特性
* 只能是post请求
* 将少量数据发送到服务器，而无需等待响应
* navigator.sendBeacon有返回值，true表示请求已发出，false表示请求未发出

## 关键截图
关键截图：
beacon请求：  

![beacon](https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/map/pic/item/728da9773912b31bdee775cd8818367adbb4e14f.jpg)  

xhr请求： 

![beacon](https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/map/pic/item/962bd40735fae6cd33d5138501b30f2443a70ff4.jpg) 
## 参考资料
https://www.sitepoint.com/introduction-beacon-api/  

https://juejin.im/post/5b694b5de51d4519700fa56a  

https://www.jianshu.com/p/606802e40fd5
