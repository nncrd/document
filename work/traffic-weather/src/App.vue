<template>
  <div id="app">
    <v-header></v-header>
<!--    <router-view/>
    <div><router-link to="/">哈哈哈</router-link></div>-->
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'App',
  components:{
    'v-header':Header
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
