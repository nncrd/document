<template>
  <div>    
    <div>
      <group title="" v-if="message === '工作人员注册'">
        <selector placeholder="请选择地址" v-model="address" title="地址" name="district" :options="addressList" @on-change="onChange"></selector>
      </group> 
      <group title="" v-if="message === '工作人员注册'">
        <selector placeholder="请选择单位" v-model="department" title="单位" name="district" :options="departmentList" @on-change="onChange"></selector>
      </group> 
      <group title="">
        <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
      </group> 
      <group title="">
        <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
      </group>   
      <box gap="10px 10px">  
        <x-button @click.native="showPlugin" type="primary">提交</x-button>
      </box>
    </div>
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
      address: '',
      department: '',
      addressList: [{key: 'nn', value: '南宁'}, {key: 'gl', value: '桂林'}, {key: 'lz', value: '柳州'}],
      departmentList: [{key: 'gtj', value: '国土局'}, {key: 'slt', value: '水利厅'}]
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
      if(this.message === '普通人员注册'){
        this.$router.push({name:'SuccessMsg', params: { title: '注册成功' , icon:''}})
      }
      else{
        this.$router.push({name:'SuccessMsg', params: { title: '注册失败' , icon:'warn'}})
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