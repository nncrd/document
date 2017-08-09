<template>

</template>

<script>
	import Vue from 'vue'
  import axios from 'axios'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  export default {
  mounted(){
    var _this=this;
    axios({
      method:'get',
      url:'/emo-web/wechat/reporter-exist'
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
      	_this.$router.push({name:'Register', params: { title: '未注册', test:'事件'}})
      }
      else if(response.data['error']=='103')
      {
      	console.log('用户已经被封号')
      	_this.$router.push({name:'SuccessMsg', params: { title: '登录失败' , icon:'warn', description:'用户已经被封号',from:'/',to:'/'}})
      }
      else if(response.data['error']=='-111')
      {
      	console.log('没有获取微信号信息')
      	_this.$router.push({name:'SuccessMsg', params: { title: '登录失败' , icon:'warn', description:'没有获取微信号信息',from:'/',to:'/'}})
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
</script>

<style>
</style>