> 主要用于测试html的页面性能采集。介绍了传统的性能指标和采集方式，
此外介绍了Google正在力推的以用户为中心的性能指标，以及相应的采集方式。

## 性能指标
目前业界常用的指标就是：`白屏`、`首屏`、`domready`和`pageloaded`四个指标，在usual-index.html中，
我们通过performance API获取到响应的指标值。  

* 白屏  

一般是认为DOM Tree构建时，解析到</head>或<body>的时候，我们认为是白屏结束的时间点。
我们可以在这个时候使用performace.mark进行打点标记，最后可以通过performance的
entry.startTime来获取白屏时间，其中entry.startTime是相对于performance.timing.navigationStart的时间。
```
<head>
...
<script>
    // 通常在head标签尾部时，打个标记，这个通常会视为白屏时间
    performance.mark("first paint time");
</script>
</head>
<body>
...
<script>
    // get the first paint time
    const fp = Math.ceil(performance.getEntriesByName('first paint time')[0].startTime);
</script>
</body>
```

* 首屏  
一般是首屏中的图片加载完毕的时候，我们认为是首屏结束的时间点。我们可以对首屏中的image做onload事件绑定，
performace.mark进行打点标记，不过打点前先进行performance.clearMarks清除操作，以获取到多张图片最后加载完毕的时间。
```
<body>
<div class="app-container">
    <img src="a.png" onload="heroImageLoaded()">
    <img src="b.png" onload="heroImageLoaded()">
    <img src="c.png" onload="heroImageLoaded()">
</div>
<script>
    // 根据首屏中的核心元素确定首屏时间
    performance.clearMarks("hero img displayed");
    performance.mark("hero img displayed");
    function heroImageLoaded() {
        performance.clearMarks("hero img displayed");
        performance.mark("hero img displayed");
    }
</script>
...
...
<script>
    // get the first screen loaded time
    const fmp = Math.ceil(performance.getEntriesByName('hero img displayed')[0].startTime);
</script>
</body>
```
* domready与pageloaded  

这两个指标有相应的事件监听，即document的DOMContentLoaded和window.onload，直接在事件的回调中使用performance打点即可。
```
<script>
    document.addEventListener('DOMContentLoaded', ()=> {
        performance.mark("dom ready");
    });
    window.onload = ()=> {
        performance.mark("page loaded");
        // get the domReady time
        const domReady = Math.ceil(performance.getEntriesByName('dom ready')[0].startTime);
        // get the page loaded time
        const pageLoad = Math.ceil(performance.getEntriesByName('page loaded')[0].startTime);
    }
</script>
```
## 以用户为中心的性能指标
这个是Google力推的指标，主要从4个视觉反馈阶段来描述页面性能。  

| 视觉反馈 | 页面状态  | 性能指标  |
| -----: | -----: | ----: |
| 是否发生？| 导航是否成功启动？服务器是否有响应？ | 首次绘制 (FP)/首次内容绘制 (FCP) |
| 是否有用？| 是否已渲染可以与用户互动的足够内容？ | 首次有效绘制 (FMP)/主角元素计时 |
| 是否可用？| 用户可以与页面交互，还是页面仍在忙于加载？ | 可交互时间 (TTI) |
| 是否令人愉快？| 交互是否顺畅而自然，没有滞后和卡顿？ | 耗时较长的任务（在技术上不存在耗时较长的任务） |

对应的指标如下图所示：
![image](https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/map/pic/item/08f790529822720e4e88381c75cb0a46f31fab96.jpg)  
此外，Google也提供了一些新的API，来获取相应的指标值。

* 首次绘制 (FP)/首次内容绘制 (FCP)  
`PerformanceObserver` 为我们提供的新功能是，能够在性能事件发生时订阅这些事件，并以异步方式响应事件。
```
let perfomanceMetrics = {};
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        // `entry` is a PerformanceEntry instance.
        // `name` will be either 'first-paint' or 'first-contentful-paint'.
        const metricName = entry.name;
        const time = Math.round(entry.startTime + entry.duration);
        if (metricName === 'first-paint') {
            perfomanceMetrics.fp = time;
        }
        if (metricName === 'first-contentful-paint') {
            perfomanceMetrics.fcp = time;
        }
    }
});

// Start observing the entry types you care about.
observer.observe({entryTypes: ['paint']});
```

* 首次有效绘制 (FMP)/主角元素计时  
目前尚无标准化的 FMP 定义，一般来说，是将 FMP 视为主角元素呈现在屏幕上的时刻。
这个的计算方法就同上面介绍的首屏指标获取，只是首屏确定的是首页中的图片，而 FMP 确定的是核心元素。

* 可交互时间 (TTI)  
TTI 主要是通过跟踪耗时较长的任务来确定，设置`PerformanceObserver`观察类型为 longtask 的条目，
然后可以根据耗时较长的条目的startTime和duration，来大致确认页面处于idle的时间，从而确定 TTI 指标。
Google希望将 TTI 指标标准化，并通过 PerformanceObserver 在浏览器中公开，但目前并不支持。
目前只能通过一个 polyfill，检测目前的 TTI，适用于所有支持 Long Tasks API 的浏览器。
该 polyfill 公开 getFirstConsistentlyInteractive() 方法，后者返回使用 TTI 值进行解析的 promise。
用法如下所示：  

1. 首先是在<head>中设置PerformanceObserver，并指定监控类型为longtask。  

```
<head>
<script>
    // collect the longtask
    if (PerformanceLongTaskTiming) {
        window.__tti = {e: []};
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // observe the longtask to get the time to interactive (TTI)
                if (entry.entryType === 'longtask') {
                    window.__tti.e.concat(entry);
                }
            }
        });
        observer.observe({entryTypes: ['longtask']});
    }
</script>
</head>
```  

2. 然后引入tti-polyfill.js(可通过npm包获取)，获取到tti的值。  

```
import ttiPolyfill from './path/to/tti-polyfill.js';

ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  ...
});
```

* 耗时较长的任务  
这个同TTI的第一步，设置PerformanceObserver，并指定监控类型为longtask，
获取到的entry包含`提供方属性`，有助于追查导致出现耗时较长任务的代码。

 

## 参考资料
http://www.alloyteam.com/2015/09/explore-performance/  

https://speedcurve.com/blog/user-timing-and-custom-metrics/  

https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#user-centric_performance_metrics  

https://github.com/GoogleChromeLabs/tti-polyfill  
 
