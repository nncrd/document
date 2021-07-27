<!--
 * @Author: jing.chen
 * @Date: 2020-11-06 13:58:56
 * @LastEditors: jing.chen
 * @LastEditTime: 2020-11-11 13:57:20
 * @Description: 
-->
### 基于qiankun，前端微服务说明
#### 开始
父应用、子应用1、子应用2都可以单独进入文件夹，分别运行命令启动服务
```
npm install
npm run serve
```
#### 效果

三个服务都成功启动后，可以看到三个页面都可以单独访问。

最终效果就是：在父应用页面内，可以看到里面的两个子应用服务效果类似iframe。
<img src="https://raw.githubusercontent.com/chenjing0823/qiankun-demo/master/images/readME.gif" alt="show" />
#### 为什么用qiankun，不用iframe
微前端的优势不作说明，项目只提供解决方案
可以在[官方手册](https://qiankun.umijs.org/zh)，看到更多介绍



***
手动启动服务可以不看以下，这个是个人使用，所以一起扔上来了。
***

#### 最外层server.js脚本
在每个项目内都npm install过后，每次都要在相应的目录内npm run serve，
为了避免每次启动需要三个命令，直接写一个node脚本，一次性启动全部应用，用法
+ 在最外层目录: ./qiankun-demo 目录下
```
node server.js
```
即可

第一次运行 也需要
```
npm install
```

其中涉及并行和串行可以自行了解
+ async.series()
+ async.parallel
