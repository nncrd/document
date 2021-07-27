<!--
 * @Author: jing.chen
 * @Date: 2020-10-29 16:57:52
 * @LastEditors: jing.chen
 * @LastEditTime: 2020-11-06 15:18:02
 * @Description: 
-->
<template>
  <div>
    <el-menu :router="true" mode="horizontal">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item v-for="no in  microAppNum" :key="no" :index="'/child0'+no">子应用0{{no}}</el-menu-item>
    </el-menu>
    <router-view />
    <!-- 子应用入口 -->
    <div id="vue"></div>
  </div>
</template>

<script>
export default {
  name: "main01",
  data() {
    return {
      microAppNum: 3
    };
  },
};
</script>