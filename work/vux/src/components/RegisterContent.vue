<template transition="fadeOutLeft">
  <div id="registerForm"> 
    <group title="">
      <selector placeholder="请选择地区" v-model="area" title="所在地区" name="district" required :options="areaList" @on-change="onChange"></selector>
    </group>   
    <group title="">
      <selector placeholder="请选择单位" v-model="department" title="单位名称" name="district" required :options="departmentList" @on-change="onChange"></selector>
    </group>
    <group title="">
      <x-input title="用户姓名" name="username" v-model="userName" placeholder="请输入姓名" required is-type="china-name"
      @on-enter="showPlugin"></x-input>
    </group>
    <group title="">
      <x-input title="手机号码" name="mobile" v-model="userPhone" placeholder="请输入手机号码" required keyboard="number" is-type="china-mobile"></x-input>
    </group>
    <box gap="1em 1em">  
      <x-button @click.native="showPlugin" type="primary">提交</x-button>
    </box>
    <div v-transfer-dom v-show="confirmBox">
      <confirm v-model="show"
      :title = "title"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">确定提交</p>
      </confirm>
    </div>   
  </div>
</template>
<style scoped>
@import '../assets/css/RegisterContent.css'
</style>
<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import axios from 'axios'
import {Selector, XInput, Box, Group,Confirm, XButton ,TransferDomDirective as TransferDom} from 'vux'
export default{
  directives: {
    TransferDom
  },
  components: {
    XButton,
    Confirm,
    XInput, 
    Group,
    Box,
    Selector
  },
  data () {
    return {
      show: false,
      confirmBox:false,
      title:"提示",
      area:'',
      department: '',
      userName:'',
      userPhone:'',
      areaList: [{key: 'nn', value: '南宁'}, {key: 'gl', value: '桂林'}, {key: 'lz', value: '柳州'}, {key: 'bh', value: '北海'}, {key: 'wz', value: '梧州'}, {key: 'bs', value: '百色'}, {key: 'fcg', value: '防城港'}, {key: 'qz', value: '钦州'}, {key: 'yl', value: '玉林'}, {key: 'hc', value: '河池'}, {key: 'gg', value: '贵港'}, {key: 'hz', value: '贺州'}, {key: 'cz', value: '崇左'}],
      departmentList: [{key: 'gtj', value: '国土局'}, {key: 'slj', value: '水利局'}, {key: 'xzf', value: '县政府'}, {key: 'fxb', value: '防汛办'}, {key: 'lyj', value: '旅游局'}, {key: 'jyj', value: '教育局'}, {key: 'zjj', value: '住建局'}, {key: 'jtb', value: '交通局'}, {key: 'ajj', value: '安监局'}, {key: 'glj', value: '公路局'}, {key: 'zzf', value: '镇政府'}, {key: 'rwb', value: '人武部'}, {key: 'qxj', value: '气象局'}]
    }
  },
  props:["message"],
  methods: {    
    onCancel () {
      console.log('on cancel')
    },
    onConfirm (msg) {
      console.log('on confirm')
      if (msg) {
        alert(msg)
      }
      var _this=this;
      let postData={
        'name':this.userName,
        'tel':this.userPhone,
        'org_id':100,
      }
      axios({
        method:'post',
        url:'/emo-web/wechat/reporter-register',
        data: postData
      })
      .then(function (response) {
        console.log(response);
        if(response.data['code']==0)
        {
          console.log('注册成功')
          _this.$router.push({name:'SuccessMsg', params: { title: '注册成功' , icon:'', description:'',from:'reporterRegister',to:'EventReporter'}})
        }
        else if(response.data['error']==102)
        {
          console.log('用户已经注册过')
          _this.$router.push({name:'SuccessMsg', params: { title: '注册失败' , icon:'warn', description:'用户已经注册过',from:'/Register',to:'/Register'}})
        }
        else if(response.data['error']==103)
        {
          console.log('用户已经被封号')
          _this.$router.push({name:'SuccessMsg', params: { title: '注册失败' , icon:'warn', description:'用户已经被封号',from:'/Register',to:'/Register'}})
        }
        else if(response.data['error']==-111)
        {
          console.log('没有获取微信号信息')
          _this.$router.push({name:'SuccessMsg', params: { title: '注册失败' , icon:'warn', description:'没有获取微信号信息',from:'/Register',to:'/Register'}})
        }
      })
      .catch(function (error) {
        console.log(error);
      }); 
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    showPlugin () {
      this.confirmBox = true;
      this.show = true;
    },
    onChange (val) {
      console.log(val)
    }
  }
}
</script>