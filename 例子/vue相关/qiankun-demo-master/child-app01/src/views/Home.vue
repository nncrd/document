<!--
 * @Author: jing.chen
 * @Date: 2020-10-29 17:04:26
 * @LastEditors: jing.chen
 * @LastEditTime: 2020-10-29 17:11:35
 * @Description: 
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="这是子应用01"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
