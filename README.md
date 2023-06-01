# Simple-Alert

## 介绍

一个简单的报警系统，具备简单的报警功能


https://github.com/LINGyue-dot/simple-alert/assets/57334095/c4847e73-9534-4725-92ad-5335476cc90d



## 运行



> 前置需要一个可连接的 mysql

1. 安装依赖

```shell
git clone https://github.com/LINGyue-dot/simple-alert.git
yarn
```

2. 配置 mysql

   1. mysql 选中数据库并执行 `packages/alert-node/db.sql`  中的创表语句

   2. 在 `packages/alert-node/` 下新建 `_data.ts` 文件，该文件包含 mysql 连接的敏感信息

   3. `_data.ts` 的基本样例如下：

      ```js
      module.exports = {
        mysql: {
          connectionLimit: 10,
          host: "127.0.0.1", // 主机名称
          user: "user", // mysql 连接的用户名
          password: "password", // mysql 连接对应的密码
          database: "alert_db", // 数据库名称
        },
      };
      ```

3. 打包并运行前端

   1. 由于报警服务服务的是生产/测试环境，所以需要打包并代理运行

   2. ```shell
      cd package/alert-react 
      yarn build
      ```

   3. ```shell
      npx http-server ./build # nginx 等其余代理工具同样可以 
      ```

4. 运行后端

   1. ```shell
      cd ../alert-node 
      yarn start
      ```

      

此时打开 http-server 代理的 url 即显示如上视频展示界面项目





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

## source-map 的上传方式

目前报警平台大多两种方式上传 source-map 

1. webpack plugin 形式，`devtool` 设置非 false ，在 build 时候将其 source-map 上传
2. 手动上传（可以定制化为 ci 时候生产 sourcemap 并将其上传）

 webpack plugin 形式更为方便

> `devtool` 非 false 情况下，build 过程中还是会生成 source-map ，虽然官网上说明 `devtool : hidden-source-map` 等设置可以不被浏览器识别，但还未知是否有其他方法可以找到 source-map ，可能存在一定安全问题。

## 简单设计

一个简单的报警服务大致就如下

![image-20230531155917113](https://typora-1300781048.cos.ap-beijing.myqcloud.com/img/202305311559370.png)





## 实现



SDK ： https://github.com/LINGyue-dot/simple-alert/blob/ceb6973dce74a750372c09942b12b724487ef6f8/packages/alert-react/src/AlertSDK/core/index.ts

Nodejs 报警服务：https://github.com/LINGyue-dot/simple-alert/blob/ceb6973dce74a750372c09942b12b724487ef6f8/packages/alert-node/src/index.ts

WebpackPlugin： https://github.com/LINGyue-dot/simple-alert/blob/ceb6973dce74a750372c09942b12b724487ef6f8/packages/alert-react/WebpackPlugin/alertPlugin.js

前端测试界面：https://github.com/LINGyue-dot/simple-alert/blob/ceb6973dce74a750372c09942b12b724487ef6f8/packages/alert-react/src/ErrorComponent/index.tsx

## 参考

[【第2932期】基于Sentry高效治理前端异常](https://mp.weixin.qq.com/s/9w62gQxhIQO_mWBhs8RHVQ)

[字节前端监控实践 - 掘金](https://juejin.cn/post/7195496297150709821#heading-0)

[blog/从0到1搭建前端监控平台，面试必备的亮点项目.md at main · xy-sea/blog](https://github.com/xy-sea/blog/blob/main/markdown/从0到1搭建前端监控平台，面试必备的亮点项目.md)

[SourceMap 上传与反解--应用性能监控全链路版-火山引擎](https://www.volcengine.com/docs/6431/104839#验证sourcemap合法性)

[前端搞监控|烛象 - 如何设计前端实时分析及报警系统](https://zhuanlan.zhihu.com/p/159115081) [Sourcemap上传 - 观测云文档](https://docs.guance.com/real-user-monitoring/sourcemap/)
