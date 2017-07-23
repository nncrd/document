<template>
  <div>    
    <div style="padding:15px;">
      <h3>{{message}}</h3>
      <input type="text" v-if="message === '工作人员注册'" placeholder="地点">
      <input type="text" v-if="message === '工作人员注册'" placeholder="单位">
      <input type="text" placeholder="手机号">
      <input type="text" placeholder="姓名">	    
      <x-button @click.native="showPlugin" type="primary">提交</x-button>
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
import { Confirm, XButton ,TransferDomDirective as TransferDom} from 'vux'
export default{
  directives: {
    TransferDom
  },
  components: {
    XButton,
    Confirm
  },
  data () {
    return {
      show: false,
      confirmBox:false,
      title:"提示"
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
      this.$router.push({path:'/SuccessMsg', params: { data: '222' }})
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
    }
  }
}
</script>