<template>
  <div>
    <x-header title="注册页面"></x-header>
    <br>
    <div class="register">
      <img class="logo" src="../assets/vux_logo.png">
      <h3></h3>
      <divider>账号注册</divider>
      <div>
        <tab :line-width=2 active-color='#35495e' v-model="index">
          <tab-item class="vux-center" :selected="activeType === item" v-for="(item, index) in registerType" @click="activeType = item" :key="index">{{item}}</tab-item>
        </tab>
        <swiper v-model="index" height="25rem" :show-dots="false">
          <swiper-item v-for="(item, index) in registerType" :key="index">
            <div class="tab-swiper vux-center"></div>
            <register-content :message="item"></register-content>
          </swiper-item>
        </swiper>
      </div>
    </div>    
  </div>
</template>
<style>
</style>
<script>
const list = () => ['普通人员注册', '工作人员注册']
import RegisterContent from './RegisterContent'
import {Group, Cell, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {  
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
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem    
  },
  data () {
    return {
      msg: 'Hello World!',
      registerType: list(),
      activeType: '普通人员注册',
      index: 0,
    }
  }
}
</script>

<style scoped>
.register {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
