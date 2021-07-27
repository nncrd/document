<!--
 * @Author: jing.chen
 * @Date: 2020-10-29 16:57:52
 * @LastEditors: jing.chen
 * @LastEditTime: 2020-10-29 17:25:42
 * @Description: 
-->
<template>
  <div class="home">
    <h1>这里是父应用，请运行子应用1，2后再点击tab才有效果</h1>
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
