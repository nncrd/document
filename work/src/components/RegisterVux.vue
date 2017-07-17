<template>
  <div>
    <div class="register">
      <img class="logo" src="../assets/vux_logo.png">
      <h3></h3>
      <divider>账号注册</divider>
      <div>
        <tab :line-width=2 active-color='#41b883' v-model="index">
          <tab-item class="vux-center" :selected="activeType === item" v-for="(item, index) in registerType" @click="activeType = item" :key="index">{{item}}</tab-item>
        </tab>
        <swiper v-model="index" height="30rem" :show-dots="false">
          <swiper-item v-for="(item, index) in registerType" :key="index">
            <div class="tab-swiper vux-center">{{item}}内容</div>
            <register-staff></register-staff>
          </swiper-item>
        </swiper>
      </div>
    </div>    
  </div>
</template>

<script>
const list = () => ['普通人员注册', '工作人员注册']
import registerStaff from './registerStaff'
import {Group, Cell, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem} from 'vux'
export default {
  components: {  
    registerStaff,  
    Group,
    Cell,
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem    
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
