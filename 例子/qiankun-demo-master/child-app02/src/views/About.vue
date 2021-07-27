<!--
 * @Author: jing.chen
 * @Date: 2020-10-29 17:15:53
 * @LastEditors: jing.chen
 * @LastEditTime: 2020-10-29 17:23:49
 * @Description: 
-->
<template>
  <div class="about">
    <h1 v-for="str in str">
      {{ str }}
    </h1>
  </div>
</template>
<script>
export default {
  data () {
    return {
      str: '第二个子应用的about页'
    }
  }
}
</script>
