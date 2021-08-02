# vuex-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

#npm run dev 提示缺少browserslist
npm install browserslist

#找不到资源则更换成淘宝镜像地址
1.获取原本的镜像地址
npm get registry 
> https://registry.npmjs.org/
设成淘宝的
npm config set registry http://registry.npm.taobao.org/
2.换成原来的
npm config set registry https://registry.npmjs.org/
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
