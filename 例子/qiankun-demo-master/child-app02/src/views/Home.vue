<!--
 * @Author: jing.chen
 * @Date: 2020-10-29 17:15:53
 * @LastEditors: jing.chen
 * @LastEditTime: 2020-10-29 17:21:51
 * @Description: 
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="这是第二个子应用！！"/>
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
