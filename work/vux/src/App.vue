<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default {
  name: 'app',
  mounted(){
    var _this=this;
		axios({
      method:'post',
      url:'/wechat/reporter-exist'
    })
    .then(function (response) {
      if(response.data['code']==0)
      {
      	console.log('已注册')
      	_this.$router.push({name:'EventReporter', params: { title: '注册成功', test:'事件'}})
      }
      else if(response.data['code']==1)
      {
      	console.log('未注册')
      	return
      }
      else if(response.data['error']=='103')
      {
      	console.log('用户已经被封号')
      	_this.$router.push({name:'SuccessMsg', params: { title: '登录失败' , icon:'warn', description:'用户已经被封号'}})
      }
      else if(response.data['error']=='-111')
      {
      	console.log('没有获取微信号信息')
      	_this.$router.push({name:'SuccessMsg', params: { title: '登录失败' , icon:'warn', description:'没有获取微信号信息'}})
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
