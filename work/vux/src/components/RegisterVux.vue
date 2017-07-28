<template>
  <div>
    <x-header title="注册页面"></x-header>
    <br>
    <div>
      <div class="registerLogo">
        <img class="logo" src="../assets/logo.png">
      </div>
      <h3></h3>
      <divider>账号注册</divider>
      <register-content :message="msg"></register-content>
    </div>    
  </div>
</template>
<style>
</style>
<script>
import RegisterContent from './RegisterContent'
import {Group, Cell, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, XHeader, TransferDom} from 'vux'

import Vue from 'vue'
import 'vue-awesome/icons/flag' 
// or import all icons if you don't care about bundle size 
import 'vue-awesome/icons' 
/* Register component with one of 2 methods */ 
import Icon from 'vue-awesome/components/Icon' 
// globally (in your main .js file) 
Vue.component('icon', Icon)

export default {
  directives: {
    TransferDom
  },
  components: {  
    Icon,
    RegisterContent,  
    Group,
    Cell,
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    XHeader 
  },
  data () {
    return {
      msg: '工作人员注册',
      index: 0,
    }
  }
}
</script>

<style scoped>
.registerLogo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
