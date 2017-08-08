<template transition="fadeOutLeft">
  <div id="registerForm"> 
    <group title="">
      <selector placeholder="请选择地区" v-model="area" title="所在地区" name="district" :options="areaList" @on-change="onChange"></selector>
    </group>   
    <group title="">
      <selector placeholder="请选择单位" v-model="department" title="单位名称" name="district" :options="departmentList" @on-change="onChange"></selector>
    </group>
    <group title="">
      <x-input title="用户姓名" name="username" v-model="openType" placeholder="请输入姓名" is-type="china-name"
      @on-enter="showPlugin"></x-input>
    </group>
    <group title="">
      <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
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
      openType:'',
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
      if(this.openType === 'admin'){
        this.$router.push({name:'SuccessMsg', params: { title: '注册成功' , icon:'', description:'内容详情'}})
      }
      else{
        this.$router.push({name:'SuccessMsg', params: { title: '登录失败' , icon:'warn', description:'该微信号已被封禁'}})
      }
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