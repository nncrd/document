<!--
 * @Author: jing.chen
 * @Date: 2020-10-29 17:04:26
 * @LastEditors: jing.chen
 * @LastEditTime: 2020-10-29 17:10:42
 * @Description: 
-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="nihao()">nihao</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    nihao () {
      console.log('nihao a ')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
