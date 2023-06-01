# Simple-Alert

## 介绍

一个简单的报警系统，具备简单的报警功能

![example video](https://typora-1300781048.cos.ap-beijing.myqcloud.com/img/202306011120133.mp4)

## 运行

前置：可连接的 mysql 数据库

1. 运行项目以及安装依赖

```shell
git clone https://github.com/LINGyue-dot/simple-alert.git
yarn

```

2. 



## 总的目标

1. 前端能通过以独立的 SDK 形式来进行引入报警功能
2. 能监听前端常见的错误
   1. JS 语法错误
   2. Promise 错误
   3. 静态资源错误
   4. 接口请求错误
3. 能有数据库支持存储记录这些错误
4. 一个简单的平台进行显示错误

## 错误类型以及错误捕获手段

前端错误大致可以归类为

1. JS 语法错误。
2. Promise 错误。reject 了没有 catch
3. 静态资源加载错误。图片等资源加载失败
4. 接口请求错误。包括非 http status 200 的所有响应 ==> 每个项目的接口请求成功状态不同，暴露一个验证请求成功与否的参数。

对应的错误捕获手段：

1. window.onerror / window.addEventListener('error')
2. window.addEventListener('unhandledrejection')
3. window.addEventListener('error')
4. 重写 XML 对象以及 fetch 对象

所以采用 addEvenetListener('error') 来一并监听 JS 语法错误以及静态资源错误





## 报警服务基本逻辑

一般的报警服务基本逻辑就如下：

1. 前端捕获错误发送给服务端
2. 服务端将其存储、广播通知并将数据返回给报警展示平台
3. 报警展示平台分析错误将其标注出来

除此之外，报警服务一个核心的功能就是追踪报错的源码，而在生产环境中我们一般 `devtool : false` 来关闭 source-map 的生成，所以线上的报错往往是关于打包后文件的信息以及位置。所以平台必须要持有项目对应的 source-map 。

### source-map 的上传方式

目前报警平台大多两种方式上传 source-map 

1. webpack plugin 形式，`devtool` 设置非 false ，在 build 时候将其 source-map 上传
2. 手动上传

由于项目一般有版本管理，所以 webpack plugin 形式更为方便

> `devtool` 非 false 情况下，build 过程中还是会生成 source-map ，虽然官网上说明 `devtool : hidden-source-map` 等设置可以不被浏览器识别，但还未知是否有其他方法可以找到 source-map ，可能存在一定安全问题。

## 简单设计

一个简单的报警服务大致就如下

![image-20230531155917113](https://typora-1300781048.cos.ap-beijing.myqcloud.com/img/202305311559370.png)



## 实现

项目：https://ghe.tusimple.io/shunze-chen/alert-demo/blob/master/src/ErrorComponent/index.tsx

SDK：https://ghe.tusimple.io/shunze-chen/alert-demo/tree/master/src/AlertSDK/core

展示平台：https://ghe.tusimple.io/shunze-chen/alert-demo/tree/master/src/AlertTable

Nodejs ： https://ghe.tusimple.io/shunze-chen/alert-node

目前已实现除了网络请求之外的所有错误捕获，邮件通知、机器人通知还没有实现

> 服务器坏了，打包老是卡死，只能录屏看看了😭







## TODO

1. 改造成 mornrepo ==> ok ，改进一下
2. README 
3. mysql 数据库等私密信息该怎么避免 push
4. 抽成 SDK 打包内容
5. 部署上去

## 参考

[【第2932期】基于Sentry高效治理前端异常](https://mp.weixin.qq.com/s/9w62gQxhIQO_mWBhs8RHVQ)

[字节前端监控实践 - 掘金](https://juejin.cn/post/7195496297150709821#heading-0)

[blog/从0到1搭建前端监控平台，面试必备的亮点项目.md at main · xy-sea/blog](https://github.com/xy-sea/blog/blob/main/markdown/从0到1搭建前端监控平台，面试必备的亮点项目.md)

[SourceMap 上传与反解--应用性能监控全链路版-火山引擎](https://www.volcengine.com/docs/6431/104839#验证sourcemap合法性)

[前端搞监控|烛象 - 如何设计前端实时分析及报警系统](https://zhuanlan.zhihu.com/p/159115081) [Sourcemap上传 - 观测云文档](https://docs.guance.com/real-user-monitoring/sourcemap/)